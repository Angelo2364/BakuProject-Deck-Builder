// scripts/match-ability-images.mjs
//
// Pega uma pasta cheia de imagens (arte extraída de um asset ripper, nomes
// tipo "Green Nobility Violent Wind Card Art.png") e casa cada imagem com a
// carta de Habilidade correspondente em src/data/specialAbilities.js e
// src/data/attributeAbilities.js, por aproximação de nome (não precisa ser
// idêntico). Copia só as imagens que deram match pra public/abilities/, com
// nome de arquivo limpo, e atualiza o campo `image` de cada carta — depois
// disso você pode apagar a pasta de assets brutos inteira.
//
// COMO RODAR (na raiz do projeto):
//   node scripts/match-ability-images.mjs ./caminho/da/pasta/de/assets
//
// Se não passar o caminho, ele procura por padrão em ./assets-raw
//
// Requer Node 18+.
//
// O que ele faz:
//   1. Lê todas as imagens (.png/.jpg/.jpeg/.webp) da pasta informada
//   2. Lê as cartas de specialAbilities.js e attributeAbilities.js
//   3. Casa cada imagem com a carta de nome mais parecido (ignora
//      maiúscula/minúscula, plural/singular, hífen, "Card Art" no final etc)
//   4. Só assume o match quando tem confiança boa E não tem empate/dúvida
//      com outra carta — casos duvidosos ficam de fora e são listados no
//      relatório, pra você decidir na mão
//   5. Copia as imagens que deram match certo pra public/abilities/<tipo>/
//      com nome de arquivo limpo (baseado no nome da carta)
//   6. Atualiza o campo `image` de cada carta casada nos arquivos .js
//   7. Escreve um relatório (match-report.txt) com: o que casou, o que
//      ficou sem imagem, e imagens que não acharam par (com sugestões)
//
// Rodar de novo é seguro — ele sempre trabalha a partir do estado atual
// dos arquivos .js, então só preenche o que ainda está faltando.

import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const PROJECT_ROOT = process.cwd();
const ASSETS_DIR = path.resolve(PROJECT_ROOT, process.argv[2] || 'assets-raw');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/abilities');
const REPORT_PATH = path.join(PROJECT_ROOT, 'match-report.txt');

// Cada arquivo de dados que tem cartas de Habilidade pra combinar com imagem.
// `folder` é só o nome da subpasta dentro de public/abilities/.
const TARGETS = [
  {
    file: path.join(PROJECT_ROOT, 'src/data/specialAbilities.js'),
    exportName: 'SPECIAL_ABILITY_CARDS',
    folder: 'special',
  },
  {
    file: path.join(PROJECT_ROOT, 'src/data/attributeAbilities.js'),
    exportName: 'ATTRIBUTE_ABILITY_CARDS',
    folder: 'attribute',
  },
];

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const STOPWORDS = new Set(['card', 'art', 'cardart', 'the', 'a', 'an', 'of', 'and', 'ability', 'image', 'render']);
const MIN_SCORE = 0.4; // score mínimo pra sequer considerar um par candidato
const CONFIDENT_MARGIN = 0.12; // diferença mínima pro 2º colocado pra aceitar sem revisão manual

// Normaliza plural simples (Winds -> Wind) só pra efeito de comparação.
function stem(word) {
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

function tokenize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .filter((w) => !STOPWORDS.has(w))
    .map(stem);
}

// Coeficiente de Dice sobre os conjuntos de palavras — robusto pra ordem
// diferente e palavras extras (tipo "Card Art" no nome do arquivo).
function diceScore(tokensA, tokensB) {
  const a = new Set(tokensA);
  const b = new Set(tokensB);
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const t of a) if (b.has(t)) intersection++;
  return (2 * intersection) / (a.size + b.size);
}

function slugify(str) {
  return tokenize(str).join('-') || 'unnamed';
}

async function loadCards(target) {
  // cache-bust no import pra sempre pegar a versão mais recente do arquivo,
  // mesmo rodando o script várias vezes na mesma sessão de terminal
  const url = `${pathToFileURL(target.file).href}?t=${Date.now()}`;
  const mod = await import(url);
  return mod[target.exportName];
}

async function main() {
  console.log('Lendo imagens de', ASSETS_DIR, '...');
  let files;
  try {
    files = (await readdir(ASSETS_DIR)).filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));
  } catch (err) {
    console.error(`Não consegui ler a pasta ${ASSETS_DIR}. Ela existe? (${err.message})`);
    process.exit(1);
  }
  console.log(`${files.length} imagens encontradas.\n`);

  // Junta as cartas dos dois arquivos num pool só, guardando de qual arquivo/array cada uma veio.
  const targetArrays = new Map(); // target.file -> array real (mutável) carregado do módulo
  const allCards = []; // { card, target }
  for (const target of TARGETS) {
    const cards = await loadCards(target);
    targetArrays.set(target.file, { target, cards });
    for (const card of cards) allCards.push({ card, target });
  }
  console.log(`${allCards.length} cartas de Habilidade no total (Especial + Atributo).`);

  const cardTokens = allCards.map((c) => tokenize(c.card.name));

  // Gera todos os pares (imagem, carta) com score >= mínimo
  const candidates = [];
  for (const file of files) {
    const tokens = tokenize(path.parse(file).name);
    for (let i = 0; i < allCards.length; i++) {
      const score = diceScore(tokens, cardTokens[i]);
      if (score >= MIN_SCORE) candidates.push({ file, cardIndex: i, score });
    }
  }
  candidates.sort((a, b) => b.score - a.score);

  const byFile = new Map();
  for (const c of candidates) {
    if (!byFile.has(c.file)) byFile.set(c.file, []);
    byFile.get(c.file).push(c);
  }

  const usedFiles = new Set();
  const usedCards = new Set();
  const assigned = [];

  for (const c of candidates) {
    if (usedFiles.has(c.file) || usedCards.has(c.cardIndex)) continue;
    const rivals = byFile.get(c.file).filter((x) => x.cardIndex !== c.cardIndex && !usedCards.has(x.cardIndex));
    const secondScore = rivals[0]?.score ?? 0;
    if (rivals.length > 0 && c.score - secondScore < CONFIDENT_MARGIN) continue; // ambíguo -> pula, vai pro relatório
    usedFiles.add(c.file);
    usedCards.add(c.cardIndex);
    assigned.push(c);
  }

  // Copia as imagens casadas e atualiza o campo `image` em memória
  await mkdir(OUTPUT_DIR, { recursive: true });
  for (const target of TARGETS) await mkdir(path.join(OUTPUT_DIR, target.folder), { recursive: true });

  const touchedFiles = new Set();
  for (const a of assigned) {
    const { card, target } = allCards[a.cardIndex];
    const ext = path.extname(a.file).toLowerCase();
    const slug = slugify(card.name);
    const destRelative = `/abilities/${target.folder}/${slug}${ext}`;
    const destAbsolute = path.join(OUTPUT_DIR, target.folder, `${slug}${ext}`);
    await copyFile(path.join(ASSETS_DIR, a.file), destAbsolute);
    card.image = destRelative;
    touchedFiles.add(target.file);
  }

  // Reescreve os arquivos .js que tiveram pelo menos 1 carta atualizada,
  // preservando os comentários do topo e só substituindo o array exportado.
  for (const target of TARGETS) {
    if (!touchedFiles.has(target.file)) continue;
    const { cards } = targetArrays.get(target.file);
    const raw = await readFile(target.file, 'utf-8');
    const re = new RegExp(`export const ${target.exportName} = [\\s\\S]*;\\s*$`);
    const newExport = `export const ${target.exportName} = ${JSON.stringify(cards, null, 2)};\n`;
    if (!re.test(raw)) {
      console.error(`Não achei "export const ${target.exportName} = ..." em ${target.file}, não mexi nele.`);
      continue;
    }
    await writeFile(target.file, raw.replace(re, newExport), 'utf-8');
  }

  // ---------- Relatório ----------
  const lines = [];
  lines.push(`Relatório de matching de imagens — ${new Date().toISOString()}`);
  lines.push('='.repeat(60));
  lines.push(`Imagens na pasta: ${files.length}`);
  lines.push(`Cartas de Habilidade no total: ${allCards.length}`);
  lines.push(`Casadas com sucesso: ${assigned.length}\n`);

  lines.push('--- CASADAS ---');
  for (const a of assigned.sort((x, y) => x.file.localeCompare(y.file))) {
    const { card } = allCards[a.cardIndex];
    lines.push(`[${a.score.toFixed(2)}] ${a.file}  ->  ${card.name}`);
  }

  const unmatchedFiles = files.filter((f) => !usedFiles.has(f));
  lines.push(`\n--- IMAGENS SEM PAR CONFIANTE (${unmatchedFiles.length}) ---`);
  for (const f of unmatchedFiles) {
    const top3 = (byFile.get(f) || []).slice(0, 3);
    if (top3.length === 0) {
      lines.push(`${f}  -- nenhuma carta parecida encontrada`);
    } else {
      const suggestions = top3.map((c) => `${allCards[c.cardIndex].card.name} (${c.score.toFixed(2)})`).join(' | ');
      lines.push(`${f}  -- sugestões: ${suggestions}`);
    }
  }

  const cardsWithoutImage = allCards.filter((c, i) => !usedCards.has(i) && !c.card.image);
  lines.push(`\n--- CARTAS AINDA SEM IMAGEM (${cardsWithoutImage.length}) ---`);
  for (const { card, target } of cardsWithoutImage) {
    lines.push(`[${target.folder}] ${card.name}`);
  }

  await writeFile(REPORT_PATH, lines.join('\n'), 'utf-8');

  console.log(`\nCasadas: ${assigned.length}`);
  console.log(`Sem par confiante: ${unmatchedFiles.length}`);
  console.log(`Cartas ainda sem imagem: ${cardsWithoutImage.length}`);
  console.log(`\nRelatório completo em: ${REPORT_PATH}`);
  console.log(`Imagens copiadas pra: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('Erro geral:', err);
  process.exit(1);
});
