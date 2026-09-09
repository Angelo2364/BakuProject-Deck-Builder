import { useMemo, useState } from 'react';
import { useDeck } from '../hooks/useDeck';
import { BAKUGANS } from '../data/bakugans';
import { SPECIAL_ABILITY_CARDS } from '../data/specialAbilities';
import { ATTRIBUTE_ABILITY_CARDS } from '../data/attributeAbilities';
import { GATE_CARDS } from '../data/gateCards';
import { ABILITY_CARD_CATEGORIES, GATE_CARD_CATEGORIES, DEFAULT_COPY_LIMITS, NEUTRAL_FILTER } from '../constants';
import Tabs from './Tabs';
import Filters from './Filters';
import CardGrid from './CardGrid';
import CardTile from './CardTile';
import DeckSlots from './DeckSlots';
import '../styles/deckBuilder.css';

// Junta as duas fontes de carta de habilidade num único pool pra aba "Cartas de Habilidade".
const ABILITY_POOL = [
  ...SPECIAL_ABILITY_CARDS.map((c) => ({
    id: c.id,
    name: c.name,
    text: c.text,
    attribute: c.requiredAttribute, // pode ser null = funciona em qualquer atributo do bakugan
    bakuganRef: c.bakuganRef,
    category: 'especial',
    maxCopies: c.maxCopies,
  })),
  ...ATTRIBUTE_ABILITY_CARDS.map((c) => ({
    id: c.id,
    name: c.name,
    text: c.text,
    attribute: c.attribute,
    bakuganRef: null,
    category: 'atributo',
    maxCopies: c.maxCopies,
  })),
];

// Quantas cópias de UMA carta específica podem entrar no deck.
// - Bakugan: sempre 1 por carta exata (mas dá pra ter a mesma espécie em
//   atributos diferentes, ex: Preyas Aquos + Preyas Darkus — só não pode
//   repetir a carta idêntica).
// - Gate/Ability: usa o maxCopies da própria carta se existir, senão o padrão da seção
function getMaxCopies(section, item) {
  if (section === 'bakugan') return 1;
  return item.maxCopies ?? DEFAULT_COPY_LIMITS[section];
}

export default function DeckBuilder() {
  const { deck, totals, addCard, removeCard, clearDeck, isFull, copiesLeft } = useDeck();

  const [activeTab, setActiveTab] = useState('bakugan');
  const [search, setSearch] = useState('');
  const [activeAttribute, setActiveAttribute] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // Reseta o filtro de categoria ao trocar de aba (bakugan não tem categoria).
  function handleTabChange(tab) {
    setActiveTab(tab);
    setActiveCategory(null);
  }

  const pool = activeTab === 'bakugan' ? BAKUGANS : activeTab === 'ability' ? ABILITY_POOL : GATE_CARDS;

  const filtered = useMemo(() => {
    return pool.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesAttribute =
        !activeAttribute ||
        (activeAttribute === NEUTRAL_FILTER ? !item.attribute : item.attribute === activeAttribute);
      const matchesCategory = !activeCategory || item.category === activeCategory;
      return matchesSearch && matchesAttribute && matchesCategory;
    });
  }, [pool, search, activeAttribute, activeCategory]);

  const categoryOptions =
    activeTab === 'ability' ? ABILITY_CARD_CATEGORIES : activeTab === 'gate' ? GATE_CARD_CATEGORIES : null;

  // Resolve as entries do deck (id -> objeto completo) pra passar ao DeckSlots.
  const resolveEntries = (section, source) =>
    Object.entries(deck[section])
      .map(([id, qty]) => ({ item: source.find((c) => c.id === id), qty }))
      .filter((e) => e.item);

  const bakuganEntries = resolveEntries('bakugan', BAKUGANS);
  const gateEntries = resolveEntries('gate', GATE_CARDS);
  const abilityEntries = resolveEntries('ability', ABILITY_POOL);

  function handleCardClick(item) {
    addCard(activeTab, item.id, getMaxCopies(activeTab, item));
  }

  return (
    <div className="deck-builder">
      <div className="deck-builder__top">
        <div className="deck-builder__top-header">
          <h2>Seu Deck</h2>
          <button type="button" className="deck-builder__clear" onClick={clearDeck}>
            Limpar deck
          </button>
        </div>
        <DeckSlots
          bakuganEntries={bakuganEntries}
          gateEntries={gateEntries}
          abilityEntries={abilityEntries}
          onRemove={removeCard}
        />
      </div>

      <main className="deck-builder__main">
        <Tabs
          active={activeTab}
          onChange={handleTabChange}
          counts={{ bakugan: totals.bakugan, ability: totals.ability, gate: totals.gate }}
        />

        <Filters
          search={search}
          onSearchChange={setSearch}
          activeAttribute={activeAttribute}
          onAttributeChange={setActiveAttribute}
          categoryOptions={categoryOptions}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          showNeutral={activeTab !== 'bakugan'}
        />

        <CardGrid isEmpty={filtered.length === 0} emptyLabel="Nenhuma carta encontrada com esse filtro.">
          {filtered.map((item) => {
            const qty = deck[activeTab][item.id] || 0;
            const maxCopies = getMaxCopies(activeTab, item);
            const addDisabled = isFull(activeTab) || copiesLeft(activeTab, item.id, maxCopies) <= 0;

            return (
              <CardTile
                key={item.id}
                image={item.image}
                name={item.name}
                attribute={item.attribute}
                tag={
                  activeTab === 'ability'
                    ? item.category === 'especial'
                      ? 'Especial'
                      : 'Atributo'
                    : activeTab === 'gate'
                    ? GATE_CARD_CATEGORIES.find((c) => c.value === item.category)?.label
                    : null
                }
                meta={activeTab !== 'bakugan' ? item.bakuganRef : null}
                description={item.text}
                qty={qty}
                maxCopies={activeTab === 'bakugan' ? 1 : maxCopies}
                onClick={() => handleCardClick(item)}
                disabled={addDisabled}
              />
            );
          })}
        </CardGrid>
      </main>
    </div>
  );
}
