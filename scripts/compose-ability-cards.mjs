// scripts/compose-ability-cards.mjs
//
// Junta a arte quadrada de cada carta de Habilidade (já casada pelo
// match-ability-images.mjs) com a moldura certa do jogo, gerando a imagem
// final da carta pronta pra usar no site. Cartas sem arte ainda recebem a
// versão "fechada" da moldura (já completa, sem buraco).
//
// COMO RODAR (na raiz do projeto):
//   1. npm install sharp        (só na primeira vez)
//   2. Cria uma pasta `frames/` na raiz do projeto com exatamente estes 4 arquivos:
//        frames/special-window.png    -> moldura marrom, com o buraco (Habilidade Especial)
//        frames/special-closed.png    -> moldura marrom, já fechada/completa
//        frames/attribute-window.png  -> moldura verde, com o buraco (Habilidade de Atributo)
//        frames/attribute-closed.png  -> moldura verde, já fechada/completa
//   3. node scripts/compose-ability-cards.mjs
//
// O que ele faz:
//   1. Detecta automaticamente onde é o "buraco" transparente de cada
//      moldura-com-janela (não precisa medir nada na mão)
//   2. Pra cada carta de specialAbilities.js e attributeAbilities.js:
//      - se ela já tem uma arte (campo `image`, preenchido pelo script
//        anterior): redimensiona a arte pra caber certinho no buraco e
//        junta com a moldura-com-janela certa
//      - se não tem arte: usa a moldura fechada correspondente, sem mexer em nada
//   3. Salva a carta pronta em public/ability-cards/<special|attribute>/<slug>.png
//   4. Atualiza o campo `image` de cada carta pra apontar pra essa imagem final
//
// As artes originais (em public/abilities/) e as molduras (em frames/) NÃO
// são apagadas nem modificadas — só lidas. Se algo sair errado no encaixe,
// dá pra rodar de novo sem perder nada.
//
// Requer Node 18+ e o pacote "sharp" instalado (npm install sharp).

import sharp from 'sharp';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const PROJECT_ROOT = process.cwd();
const FRAMES_DIR = path.join(PROJECT_ROOT, 'frames');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/ability-cards');

const FRAME_SETS = {
  especial: {
    window: path.join(FRAMES_DIR, 'special-window.png'),
    closed: path.join(FRAMES_DIR, 'special-closed.png'),
    outFolder: 'special',
  },
  atributo: {
    window: path.join(FRAMES_DIR, 'attribute-window.png'),
    closed: path.join(FRAMES_DIR, 'attribute-closed.png'),
    outFolder: 'attribute',
  },
};

// specialAbilities.js usa category: 'especial'; attributeAbilities.js não
// tem campo `category` (sempre é atributo) — por isso o `defaultCategory`.
const TARGETS = [
  { file: path.join(PROJECT_ROOT, 'src/data/specialAbilities.js'), exportName: 'SPECIAL_ABILITY_CARDS', defaultCategory: 'especial' },
  { file: path.join(PROJECT_ROOT, 'src/data/attributeAbilities.js'), exportName: 'ATTRIBUTE_ABILITY_CARDS', defaultCategory: 'atributo' },
];

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// Acha a maior região transparente conectada da imagem (o "buraco" onde a
// arte entra) e devolve a caixa que a envolve. Ignora ruído pequeno
// (pixels transparentes isolados nas bordas por antialiasing).
function findWindowBBox(data, width, height, channels) {
  const alphaOf = (idx) => data[idx * channels + (channels - 1)];
  const visited = new Uint8Array(width * height);
  let best = null;
  const stack = [];

  for (let start = 0; start < width * height; start++) {
    if (visited[start] || alphaOf(start) >= 10) continue;
    stack.length = 0;
    stack.push(start);
    visited[start] = 1;
    let minX = width, maxX = 0, minY = height, maxY = 0, count = 0;

    while (stack.length) {
      const cur = stack.pop();
      const cx = cur % width;
      const cy = (cur / width) | 0;
      count++;
      if (cx < minX) minX = cx;
      if (cx > maxX) maxX = cx;
      if (cy < minY) minY = cy;
      if (cy > maxY) maxY = cy;

      if (cx > 0) {
        const n = cur - 1;
        if (!visited[n] && alphaOf(n) < 10) { visited[n] = 1; stack.push(n); }
      }
      if (cx < width - 1) {
        const n = cur + 1;
        if (!visited[n] && alphaOf(n) < 10) { visited[n] = 1; stack.push(n); }
      }
      if (cy > 0) {
        const n = cur - width;
        if (!visited[n] && alphaOf(n) < 10) { visited[n] = 1; stack.push(n); }
      }
      if (cy < height - 1) {
        const n = cur + width;
        if (!visited[n] && alphaOf(n) < 10) { visited[n] = 1; stack.push(n); }
      }
    }

    if (!best || count > best.count) best = { minX, maxX, minY, maxY, count };
  }
  return best;
}

async function detectWindow(framePath) {
  const { data, info } = await sharp(framePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bbox = findWindowBBox(data, info.width, info.height, info.channels);
  if (!bbox) throw new Error(`Não achei nenhuma região transparente em ${framePath} — é mesmo a versão com janela?`);
  return { ...bbox, frameWidth: info.width, frameHeight: info.height };
}

async function composeWithArt(artPath, framePath, win, outPath) {
  const boxW = win.maxX - win.minX + 1;
  const boxH = win.maxY - win.minY + 1;

  const artResized = await sharp(artPath)
    .resize(boxW, boxH, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .png()
    .toBuffer();

  await sharp({
    create: { width: win.frameWidth, height: win.frameHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: artResized, left: win.minX, top: win.minY },
      { input: framePath, left: 0, top: 0 },
    ])
    .png()
    .toFile(outPath);
}

async function loadCards(target) {
  const url = `${pathToFileURL(target.file).href}?t=${Date.now()}`;
  const mod = await import(url);
  return mod[target.exportName];
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'unnamed';
}

async function main() {
  for (const key of Object.keys(FRAME_SETS)) {
    for (const kind of ['window', 'closed']) {
      const p = FRAME_SETS[key][kind];
      if (!(await fileExists(p))) {
        console.error(`Faltando: ${p}\nCria a pasta frames/ com os 4 arquivos (veja o comentário no topo do script).`);
        process.exit(1);
      }
    }
  }

  console.log('Detectando a janela transparente de cada moldura...');
  const windows = {};
  for (const key of Object.keys(FRAME_SETS)) {
    windows[key] = await detectWindow(FRAME_SETS[key].window);
    const w = windows[key];
    console.log(`  ${key}: buraco de ${w.maxX - w.minX + 1}x${w.maxY - w.minY + 1}px em (${w.minX},${w.minY})`);
  }

  for (const folder of Object.values(FRAME_SETS).map((f) => f.outFolder)) {
    await mkdir(path.join(OUTPUT_DIR, folder), { recursive: true });
  }

  let withArt = 0;
  let closedOnly = 0;
  let errors = 0;

  for (const target of TARGETS) {
    const cards = await loadCards(target);
    let touched = false;

    for (const card of cards) {
      const category = card.category || target.defaultCategory;
      const frameSet = FRAME_SETS[category];
      if (!frameSet) {
        console.warn(`Categoria desconhecida "${category}" na carta "${card.name}", pulei.`);
        continue;
      }

      const slug = slugify(card.name);
      const outPath = path.join(OUTPUT_DIR, frameSet.outFolder, `${slug}.png`);
      const outRelative = `/ability-cards/${frameSet.outFolder}/${slug}.png`;

      try {
        if (card.image && (await fileExists(path.join(PROJECT_ROOT, 'public', card.image.replace(/^\//, ''))))) {
          await composeWithArt(
            path.join(PROJECT_ROOT, 'public', card.image.replace(/^\//, '')),
            frameSet.window,
            windows[category],
            outPath
          );
          withArt++;
        } else {
          await sharp(frameSet.closed).png().toFile(outPath);
          closedOnly++;
        }
        card.image = outRelative;
        touched = true;
      } catch (err) {
        console.error(`Erro na carta "${card.name}":`, err.message);
        errors++;
      }
    }

    if (touched) {
      const raw = await readFile(target.file, 'utf-8');
      const re = new RegExp(`export const ${target.exportName} = [\\s\\S]*;\\s*$`);
      const newExport = `export const ${target.exportName} = ${JSON.stringify(cards, null, 2)};\n`;
      await writeFile(target.file, raw.replace(re, newExport), 'utf-8');
    }
  }

  console.log(`\nCom arte própria: ${withArt}`);
  console.log(`Com moldura fechada (sem arte ainda): ${closedOnly}`);
  console.log(`Erros: ${errors}`);
  console.log(`\nImagens finais em: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('Erro geral:', err);
  process.exit(1);
});
