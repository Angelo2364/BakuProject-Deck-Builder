# Bakuproject Deck Builder — pacote de arquivos

## Onde entra cada coisa

```
src/
  constants.js                 -> atributos, cores, limites de deck (3/10/20)
  data/
    bakugans.js                -> 306 variantes de bakugan (51 nomes x 6 atributos)
                                   já parseadas do swooshbakugans.duckdns.org/store
    specialAbilities.js        -> 132 Habilidades Especiais (ligadas a um bakugan
                                   específico), também extraídas do site
    attributeAbilities.js      -> PLACEHOLDER vazio. Você preenche as Habilidades
                                   de Atributo (funcionam pra qualquer bakugan
                                   daquele atributo)
    gateCards.js                -> PLACEHOLDER vazio. Você preenche as 3 categorias
                                   de carta de portão (específica / atributo / função)
  hooks/
    useDeck.js                  -> estado do deck (add/remove/limites)
  components/
    DeckBuilder.jsx             -> componente principal, junta tudo
    DeckPanel.jsx                -> painel esquerdo com o deck montado
    Tabs.jsx                     -> as 3 abas (Bakugans / Habilidade / Portão)
    Filters.jsx                  -> busca por nome + filtro de atributo + categoria
    CardGrid.jsx / CardTile.jsx  -> grid de cartas e o tile individual
  styles/
    deckBuilder.css              -> todo o visual (tema escuro, cor por atributo)
```

## Como plugar

1. Copie a pasta `src/data`, `src/hooks`, `src/components` e `src/styles` (ou só
   os arquivos, se já tiver essas pastas) pro seu projeto.
2. Importe e renderize em qualquer lugar:

```jsx
import DeckBuilder from './components/DeckBuilder';

export default function App() {
  return <DeckBuilder />;
}
```

3. O CSS já é importado dentro do próprio `DeckBuilder.jsx`
   (`import '../styles/deckBuilder.css'`) — se seu projeto usa outro sistema de
   import de CSS (CSS Modules, Tailwind, etc), me avisa que eu adapto.

## O que falta você preencher

- **`gateCards.js`**: as 10 cartas de portão do jogo. O arquivo já tem a
  estrutura esperada e um exemplo comentado de cada categoria (especifica,
  atributo, função).
- **`attributeAbilities.js`**: as Habilidades de Atributo (as 20 de habilidade
  se dividem entre Especial e Atributo — as Especiais já vieram prontas do
  site, essas você adiciona aqui).
- Imagens: os bakugans já têm o campo `image` apontando pro
  `swooshbakugans.duckdns.org`. Se quiser hospedar as artes você mesmo, é só
  trocar a URL em `bakugans.js` (ou passar por um script de find/replace).

## Coisas que fiz por decisão própria (me avisa se quiser mudar)

- **Regra de limite por seção**: o hook barra automaticamente adicionar carta
  além de 3 Bakugans / 10 Portão / 20 Habilidade — não limitei cópias por
  carta individual, porque isso não foi especificado (dá pra adicionar
  facilmente se o jogo tiver esse tipo de regra).
- **Filtro de atributo em cartas sem atributo fixo** (ex: uma Habilidade
  Especial que funciona em qualquer variante do bakugan): elas não somem
  quando você filtra por atributo, só as com atributo travado é que filtram.
- Botões de +/− direto no tile (em vez de um input de quantidade) pra ficar
  rápido de montar o deck olhando pro grid.
