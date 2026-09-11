// scripts/download-bakugan-images.mjs
//
// Baixa todas as imagens de src/data/bakugans.js do swooshbakugans.duckdns.org
// pra `public/bakugans/<atributo>/<nome>.png` e reescreve o campo `image` de
// cada bakugan em bakugans.js pra apontar pro arquivo local em vez da URL
// externa. Resolve o problema de carregamento lento/imagens quebradas na
// Vercel, já que o site vai servir as imagens do próprio domínio.
//
// COMO RODAR (na raiz do projeto, onde fica a pasta src/):
//   node scripts/download-bakugan-images.mjs
//
// Requer Node 18+ (usa fetch nativo, que já vem com o Node do Vite).
//
// O que ele faz:
//   1. Lê src/data/bakugans.js
//   2. Baixa cada imagem pra public/bakugans/<atributo>/<nome-do-bakugan>.png
//   3. Sobrescreve o campo `image` de cada bakugan com o caminho local
//      (ex: '/bakugans/pyrus/dragonoid.png')
//   4. Salva o bakugans.js atualizado
//   5. No final, mostra uma lista de quais imagens falharam (se alguma),
//      sem quebrar as outras — só continua com a URL antiga nessas.
//
// É seguro rodar de novo: se a imagem já existe localmente, ele pula o
// download (não baixa tudo de novo toda vez).

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const BAKUGANS_PATH = path.join(PROJECT_ROOT, 'src/data/bakugans.js');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public/bakugans');

// Quantos downloads em paralelo — baixo o suficiente pra não sobrecarregar
// o site da pessoa que hospeda as imagens.
const CONCURRENCY = 4;

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acento, por via das dúvidas
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function downloadOne(bakugan) {
  const { name, attribute, image } = bakugan;
  if (!image) return { bakugan, status: 'skipped-no-url' };

  const ext = (path.extname(new URL(image).pathname) || '.png').toLowerCase();
  const folder = path.join(PUBLIC_DIR, attribute.toLowerCase());
  const filename = `${slugify(name)}${ext}`;
  const localPath = path.join(folder, filename);
  const publicPath = `/bakugans/${attribute.toLowerCase()}/${filename}`;

  await mkdir(folder, { recursive: true });

  if (await fileExists(localPath)) {
    return { bakugan, status: 'already-exists', publicPath };
  }

  try {
    const res = await fetch(image);
    if (!res.ok) {
      return { bakugan, status: 'http-error', code: res.status };
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(localPath, buffer);
    return { bakugan, status: 'downloaded', publicPath };
  } catch (err) {
    return { bakugan, status: 'fetch-error', error: err.message };
  }
}

// Roda um pool de N downloads em paralelo em vez de tudo de uma vez.
async function runPool(items, worker, concurrency) {
  const results = [];
  let index = 0;
  async function next() {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

async function main() {
  console.log('Lendo', BAKUGANS_PATH, '...');
  const raw = await readFile(BAKUGANS_PATH, 'utf-8');

  const match = raw.match(/export const BAKUGANS = (\[[\s\S]*\]);\s*$/);
  if (!match) {
    console.error('Não consegui achar "export const BAKUGANS = [...]" no arquivo. Abortando.');
    process.exit(1);
  }
  const bakugans = JSON.parse(match[1]);
  console.log(`Encontrados ${bakugans.length} bakugans. Baixando imagens (${CONCURRENCY} por vez)...`);

  const results = await runPool(bakugans, downloadOne, CONCURRENCY);

  let downloaded = 0;
  let already = 0;
  let failed = [];

  for (const r of results) {
    if (r.status === 'downloaded') {
      downloaded++;
      r.bakugan.image = r.publicPath;
    } else if (r.status === 'already-exists') {
      already++;
      r.bakugan.image = r.publicPath;
    } else {
      failed.push(r);
    }
  }

  console.log(`\nBaixadas agora: ${downloaded}`);
  console.log(`Já existiam localmente: ${already}`);
  console.log(`Falharam: ${failed.length}`);
  if (failed.length) {
    console.log('\nAs que falharam (ficaram com a URL antiga, pra não perder o dado):');
    for (const f of failed) {
      console.log(`  - ${f.bakugan.attribute} ${f.bakugan.name}: ${f.status} ${f.code ?? f.error ?? ''}`);
    }
  }

  const newContent = raw.replace(match[1], JSON.stringify(bakugans, null, 2));
  await writeFile(BAKUGANS_PATH, newContent, 'utf-8');
  console.log('\nsrc/data/bakugans.js atualizado com os caminhos locais.');
  console.log('Imagens salvas em public/bakugans/<atributo>/');
}

main().catch((err) => {
  console.error('Erro geral:', err);
  process.exit(1);
});
