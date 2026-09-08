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

// Quantas cópias da MESMA carta podem entrar no deck.
// Ex: só 1 cópia de cada carta de Portão, até 3 cópias de cada Habilidade.
// Bakugan não tem limite de cópia definido ainda (o normal seria 1, já que
// o deck só tem 3 no total) — se quiser travar isso, é só adicionar
// "bakugan: 1" aqui embaixo.
export const CARD_COPY_LIMITS = {
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
