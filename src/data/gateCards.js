// Cartas de Portão do Bakuproject.
// Preencha esse array com as cartas reais. Estrutura esperada por carta:
//
// {
//   id: 'gate-001',                 // único, use um slug estável
//   name: 'Nome da carta',
//   category: 'especifica' | 'atributo' | 'funcao',
//   attribute: 'Pyrus' | null,      // obrigatório se category === 'atributo'
//   bakuganRef: 'Dragonoid' | null, // obrigatório se category === 'especifica'
//   power: 400,                     // valor de G's que a carta concede, se aplicável
//   text: 'Descrição do efeito da carta.',
//   image: '',                     // URL da arte, se tiver
// }
//
// Exemplos (apague/edite quando entrar com os dados reais):
export const GATE_CARDS = [
  // {
  //   id: 'gate-pyrus-attr-400',
  //   name: 'Pyrus Reactor',
  //   category: 'atributo',
  //   attribute: 'Pyrus',
  //   bakuganRef: null,
  //   power: 400,
  //   text: 'Qualquer Bakugan Pyrus em cima dessa carta ganha +400 G\u2019s.',
  //   image: '',
  // },
  // {
  //   id: 'gate-dragonoid-special',
  //   name: 'Dragon Field',
  //   category: 'especifica',
  //   attribute: null,
  //   bakuganRef: 'Dragonoid',
  //   power: null,
  //   text: 'Dobra o poder do Dragonoid que estiver em cima dessa carta.',
  //   image: '',
  // },
  // {
  //   id: 'gate-purge',
  //   name: 'Purge Field',
  //   category: 'funcao',
  //   attribute: null,
  //   bakuganRef: null,
  //   power: null,
  //   text: 'Destr\u00f3i todos os Bakugans que estiverem em cima dessa carta quando ela for ativada.',
  //   image: '',
  // },
];
