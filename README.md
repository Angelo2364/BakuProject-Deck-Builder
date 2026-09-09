# Bakuproject Deck Builder — README de handoff

Documento pensado pra você (ou qualquer outra IA/dev) entender o projeto
inteiro sem precisar reconstruir o histórico da conversa. Se for passar
esse projeto pra outro assistente, cola esse arquivo inteiro na primeira
mensagem junto com o código.

## O que é o projeto

Site em React pra montar deck do jogo de cartas "Bakuproject" (baseado em
Bakugan). Um deck tem:

- **3 Bakugans** — só 1 por espécie (não pode ter 2 Dragonoid, mesmo que de
  atributos diferentes).
- **10 Cartas de Portão** — no máx. 1 cópia de cada carta.
- **20 Cartas de Habilidade** — divididas em Especiais (ligadas a um
  Bakugan) e de Atributo (funcionam em qualquer Bakugan daquele atributo);
  o número de cópias permitidas varia carta a carta (1, 2 ou 3).

A tela é dividida em duas partes: um painel visual do deck no topo (3
blocos com "slots" fixos, tipo o print de referência do jogo original) e,
embaixo, a área de escolha com 3 abas (Bakugans / Cartas de Habilidade /
Cartas de Portão), busca por nome e filtro por atributo/categoria.

## Árvore de arquivos e o que cada um faz

```
src/
  constants.js                    <- config central: atributos, cores, limites de deck
  data/
    bakugans.js                   <- 306 bakugans (51 nomes x 6 atributos), PRONTO
    specialAbilities.js           <- 132 Habilidades Especiais, PRONTO
    attributeAbilities.js         <- Habilidades de Atributo — VAZIO, placeholder
    gateCards.js                  <- Cartas de Portão — VAZIO, placeholder
  hooks/
    useDeck.js                    <- estado do deck + regras de limite
  components/
    DeckBuilder.jsx                <- componente raiz, junta tudo, regras de negócio
    DeckSlots.jsx                  <- painel visual do deck (topo da tela)
    Tabs.jsx                       <- as 3 abas
    Filters.jsx                    <- busca + chips de atributo/categoria/neutro
    CardGrid.jsx / CardTile.jsx    <- grid de escolha e o card individual (clicável)
  styles/
    deckBuilder.css                <- todo o CSS (tema escuro, cor por atributo)
```

Não existe `main.jsx`/`App.jsx`/`index.html` nesse pacote — isso já existe
no projeto Vite do usuário. Só importa `<DeckBuilder />` de
`components/DeckBuilder.jsx` em algum lugar que renderize.

## Modelo de dados (formato de cada card)

### Bakugan (`data/bakugans.js`, array `BAKUGANS`)
```js
{
  id: 'pyrus-dragonoid',           // único, atributo+nome
  name: 'Dragonoid',                // nome da espécie (usado na regra de 1-por-espécie)
  attribute: 'Pyrus',
  image: 'https://...',
  attributeChanger: ['Pyrus', 'Subterra', 'Ventus'], // pra quais atributos pode virar (se tiver)
  bugs: ['texto de bug conhecido, se tiver'],
  abilities: [ /* habilidades ligadas a esse bakugan específico, informativo */ ]
}
```

### Habilidade Especial (`data/specialAbilities.js`, array `SPECIAL_ABILITY_CARDS`)
```js
{
  id: 'special-42',
  name: 'Nome da carta',
  text: 'Descrição do efeito',
  bakuganRef: 'Dragonoid',          // a qual bakugan essa habilidade pertence
  requiredAttribute: 'Pyrus' | null, // null = serve pra qualquer variante de atributo do bakugan
  category: 'especial',
  maxCopies: 3                       // AJUSTAR manualmente pra 1 ou 2 onde o jogo pedir
}
```

### Habilidade de Atributo (`data/attributeAbilities.js`, array `ATTRIBUTE_ABILITY_CARDS`)
**Vazio, precisa ser preenchido.** Formato esperado:
```js
{
  id: 'attr-ability-001',
  name: 'Nome da carta',
  attribute: 'Pyrus',
  text: 'Descrição do efeito',
  image: '',
  maxCopies: 3
}
```

### Carta de Portão (`data/gateCards.js`, array `GATE_CARDS`)
**Vazio, precisa ser preenchido.** Formato esperado:
```js
{
  id: 'gate-001',
  name: 'Nome da carta',
  category: 'especifica' | 'atributo' | 'funcao',
  attribute: 'Pyrus' | null,        // obrigatório se category === 'atributo'
  bakuganRef: 'Dragonoid' | null,   // obrigatório se category === 'especifica'
  power: 400,                        // opcional, valor de G's
  text: 'Descrição do efeito',
  image: '',
  maxCopies: 1                       // opcional, padrão já é 1
}
```

## Regras de negócio implementadas (e onde mexer)

Tudo isso vive em **`DeckBuilder.jsx`** + **`hooks/useDeck.js`** +
**`constants.js`**:

1. **Limite total por seção** (3/10/20): `constants.js` → `DECK_LIMITS`.
   Aplicado em `useDeck.js` (`addCard`, checa `currentTotal >= DECK_LIMITS[section]`).
2. **Limite de cópia por carta**: função `getMaxCopies(section, item)` em
   `DeckBuilder.jsx`. Bakugan sempre retorna 1; Gate/Ability olham o campo
   `maxCopies` da própria carta, com fallback pra `DEFAULT_COPY_LIMITS` em
   `constants.js` se a carta não tiver o campo.
3. **1 cópia por carta exata**: Bakugan sempre tem `maxCopies = 1` em
   `getMaxCopies` — mas isso é por carta exata (ex: "Aquos Preyas"), não por
   espécie. Dá pra ter "Aquos Preyas" + "Darkus Preyas" no mesmo deck, só
   não pode repetir a carta idêntica duas vezes.
4. **Interação por clique**: `CardTile.jsx` é um `<button>` inteiro
   clicável (sem +/-). Clicar chama `handleCardClick` em `DeckBuilder.jsx`,
   que decide se pode adicionar e chama `addCard`. Pra remover, clica na
   carta já dentro do deck (painel do topo), que é `DeckSlots.jsx` chamando
   `removeCard`.
5. **Filtro "Neutro"**: `constants.js` → `NEUTRAL_FILTER`. Mostra cartas com
   `attribute: null`. Fica escondido na aba Bakugan (prop `showNeutral` em
   `Filters.jsx`, controlado em `DeckBuilder.jsx`).
6. **Símbolos de atributo no filtro**: `data/attributeIcons.js` — mapa
   atributo → caminho/URL do ícone. Enquanto estiver vazio (`''`), o chip
   mostra o nome do atributo em texto (fallback em `Filters.jsx`). Preencha
   esse arquivo assim que tiver os símbolos.

## O que falta preencher (prioridade pra continuar o projeto)

1. **`data/gateCards.js`** — as 10 cartas de portão reais do jogo.
2. **`data/attributeAbilities.js`** — as Habilidades de Atributo (as
   Especiais já estão prontas, extraídas do site).
3. Revisar **`maxCopies`** em `specialAbilities.js` — todas vieram com `3`
   por padrão, mas nem toda habilidade permite 3 cópias no jogo real. Tem
   que passar carta por carta.
4. **`data/attributeIcons.js`** — os símbolos dos 6 elementos, usados nos
   chips de filtro em vez do nome escrito.
5. Imagens: bakugans e habilidades especiais usam URLs de
   `swooshbakugans.duckdns.org` (site de vendas de um jogador da
   comunidade, só usado como fonte de dados/arte). Se quiser trocar por
   imagens próprias, o campo é `image` em cada objeto.

## Stack e como rodar

- React puro (hooks, sem Redux/Zustand — estado do deck vive em
  `useDeck.js` com `useState`).
- CSS puro em `styles/deckBuilder.css`, importado direto dentro de
  `DeckBuilder.jsx` (`import '../styles/deckBuilder.css'`). Se o projeto
  usar outro sistema de estilos (Tailwind, CSS Modules, styled-components),
  isso precisa ser adaptado.
- Fonte `Barlow Condensed` (títulos) + `Inter` (corpo), importadas via
  Google Fonts no topo do CSS (`@import url(...)`).
- Sem dependências externas além do React em si — não usa nenhuma lib de
  ícone, roteamento ou UI kit.

Rodar: já é parte de um projeto Vite existente do usuário
(`npm run dev`). Esse pacote de arquivos só entra dentro de um `src/` que
já tem `main.jsx`/`App.jsx` configurados.

## Histórico de decisões (coisas que decidi sem o usuário pedir explicitamente)

- Bakugan não tem limite de cópia configurável (sempre 1 por carta exata),
  diferente de Gate/Ability que são flexíveis. A regra é por carta, não por
  espécie — variantes de atributo diferentes contam como cartas diferentes.
- O painel visual do deck expande cada cópia de uma carta em um slot
  separado (uma Habilidade com 3 cópias ocupa 3 quadradinhos, repetindo a
  mesma arte), em vez de 1 quadradinho com um badge "×3". Foi decisão
  estética pra ficar parecido com o jogo de referência.
- Imagens usam `object-fit: contain` (carta inteira visível, sem cortar)
  em vez de `cover`, porque as artes têm dimensões bem diferentes entre si
  e cortar deixaria inconsistente.
- Filtro de atributo não esconde cartas sem atributo definido, a não ser
  que o filtro "Neutro" esteja ativo — assim uma Habilidade Especial sem
  `requiredAttribute` aparece em qualquer filtro de atributo escolhido.

## Se for passar pra outra IA

Manda: este README + a pasta `src/` inteira (ou o zip). Não precisa mandar
`raw_store.txt` nem `parse.py` (são só o script que gerou os dados a
partir do site — só relevante se for reprocessar a fonte de novo).
