// Valor especial usado no filtro de atributo pra representar cartas sem
// atributo fixo (ex: uma Habilidade Especial que serve pra qualquer
// variante de atributo do bakugan, ou uma carta de Função neutra).
export const NEUTRAL_FILTER = '__neutral__';

// Atributos do jogo e cores de identidade visual de cada um.
// Ajuste os hex livremente para bater com a arte oficial se quiser.
export const ATTRIBUTES = ['Pyrus', 'Darkus', 'Aquos', 'Subterra', 'Ventus', 'Haos'];

export const ATTRIBUTE_COLORS = {
  Pyrus: '#d94a2b',
  Darkus: '#6b3fa0',
  Aquos: '#1f83c4',
  Subterra: '#b8792f',
  Ventus: '#4c9a4a',
  Haos: '#c9a227',
  Unknown: '#7a7a7a',
};

// Limites de deck definidos pelas regras do Bakuproject.
export const DECK_LIMITS = {
  bakugan: 3,
  gate: 10,
  ability: 20,
};

// Quantas cópias da MESMA carta podem entrar no deck, por padrão.
// - Gate: toda carta de portão é limitada a 1 cópia.
// - Ability: usado só como fallback — o ideal é cada carta em
//   specialAbilities.js / attributeAbilities.js ter seu próprio campo
//   `maxCopies` (1, 2 ou 3), porque nem toda habilidade permite 3 cópias.
//   Se a carta não tiver `maxCopies` definido, cai nesse valor abaixo.
// - Bakugan: não usa esse limite — a regra de Bakugan é "1 por espécie",
//   ver checagem em DeckBuilder.jsx (canAddBakugan).
export const DEFAULT_COPY_LIMITS = {
  gate: 1,
  ability: 3,
};

// Categorias de carta de portão.
// 'especifica'  -> dobra o poder de um bakugan específico (nem todo bakugan tem uma)
// 'atributo'    -> dá +X de poder para qualquer bakugan daquele atributo em cima dela
// 'funcao'      -> efeito especial (ex: "mata todos os bakugans em cima dela quando ativada")
export const GATE_CARD_CATEGORIES = [
  { value: 'especifica', label: 'Específica' },
  { value: 'atributo', label: 'Atributo' },
  { value: 'funcao', label: 'Função' },
];

// Categorias de carta de habilidade.
// 'especial'  -> ligada a um bakugan específico (SPECIAL_ABILITY_CARDS)
// 'atributo'  -> funciona em qualquer bakugan daquele atributo (ATTRIBUTE_ABILITY_CARDS)
export const ABILITY_CARD_CATEGORIES = [
  { value: 'especial', label: 'Especial' },
  { value: 'atributo', label: 'Atributo' },
];
