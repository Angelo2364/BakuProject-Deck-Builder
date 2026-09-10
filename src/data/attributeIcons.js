// Símbolos dos elementos/atributos, usados nos chips de filtro (Filters.jsx)
// no lugar do nome escrito.
//
// Onde colocar os arquivos SVG: na pasta `public/icons/` do seu projeto Vite
// (não dentro de `src/`). A pasta `public/` fica na raiz do projeto, do lado
// de fora do `src/` — se ela não existir ainda, é só criar.
//
//   seu-projeto/
//     public/
//       icons/
//         pyrus.svg
//         darkus.svg
//         aquos.svg
//         subterra.svg
//         ventus.svg
//         haos.svg
//     src/
//       ...
//
// Arquivo dentro de `public/` é servido igual ele tá, direto pela raiz do
// site — por isso o caminho aqui embaixo começa com `/icons/...` (sem
// precisar de import nenhum). Se preferir nomear os arquivos diferente ou
// usar outra pasta, só ajustar os caminhos abaixo pra bater.
//
// Assim que o arquivo existir em `public/icons/pyrus.svg`, o ícone aparece
// sozinho no filtro (Filters.jsx já tem fallback: se o arquivo não existir
// ainda, ou o caminho estiver vazio, mostra o nome do atributo em texto).
export const ATTRIBUTE_ICONS = {
  Pyrus: '/icons/pyrus.svg',
  Darkus: '/icons/darkus.svg',
  Aquos: '/icons/aquos.svg',
  Subterra: '/icons/subterra.svg',
  Ventus: '/icons/ventus.svg',
  Haos: '/icons/haos.svg',
};
