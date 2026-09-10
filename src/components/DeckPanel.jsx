import { DECK_LIMITS, ATTRIBUTE_COLORS } from '../constants';

// Recebe as três listas já resolvidas (id -> objeto completo da carta + qty)
// pra não duplicar lookup de dados aqui dentro.
export default function DeckPanel({
  bakuganEntries,
  gateEntries,
  abilityEntries,
  totals,
  onRemove,
  onClearDeck,
}) {
  const deckIsComplete =
    totals.bakugan === DECK_LIMITS.bakugan &&
    totals.gate === DECK_LIMITS.gate &&
    totals.ability === DECK_LIMITS.ability;

  return (
    <aside className="deck-panel">
      <div className="deck-panel__header">
        <h2>Seu Deck</h2>
        <button type="button" className="deck-panel__clear" onClick={onClearDeck}>
          Limpar
        </button>
      </div>

      <p className={`deck-panel__status ${deckIsComplete ? 'is-complete' : ''}`}>
        {deckIsComplete ? 'Deck completo' : 'Montando deck...'}
      </p>

      <DeckSection
        title="Habilidades"
        limit={DECK_LIMITS.ability}
        count={totals.ability}
        entries={abilityEntries}
        onRemove={(id) => onRemove('ability', id)}
        renderLabel={(item) => item.name}
        renderMeta={(item) => item.attribute || item.bakuganRef}
        colorFor={(item) => (item.attribute ? ATTRIBUTE_COLORS[item.attribute] : '#5a5a66')}
      />

      <DeckSection
        title="Cartas de Portão"
        limit={DECK_LIMITS.gate}
        count={totals.gate}
        entries={gateEntries}
        onRemove={(id) => onRemove('gate', id)}
        renderLabel={(item) => item.name}
        renderMeta={(item) => item.attribute || item.bakuganRef || 'Função'}
        colorFor={(item) => (item.attribute ? ATTRIBUTE_COLORS[item.attribute] : '#5a5a66')}
      />

      <DeckSection
        title="Bakugans"
        limit={DECK_LIMITS.bakugan}
        count={totals.bakugan}
        entries={bakuganEntries}
        onRemove={(id) => onRemove('bakugan', id)}
        renderLabel={(item) => item.name}
        renderMeta={(item) => item.attribute}
        colorFor={(item) => ATTRIBUTE_COLORS[item.attribute]}
      />
    </aside>
  );
}

function DeckSection({ title, limit, count, entries, onRemove, renderLabel, renderMeta, colorFor }) {
  return (
    <section className="deck-section">
      <div className="deck-section__header">
        <h3>{title}</h3>
        <span className={`deck-section__count ${count === limit ? 'is-full' : ''}`}>
          {count}/{limit}
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="deck-section__empty">Nenhuma carta escolhida ainda.</p>
      ) : (
        <ul className="deck-section__list">
          {entries.map(({ item, qty }) => (
            <li key={item.id} className="deck-section__row" style={{ '--accent': colorFor(item) }}>
              <span className="deck-section__row-qty">{qty}×</span>
              <span className="deck-section__row-label">{renderLabel(item)}</span>
              <span className="deck-section__row-meta">{renderMeta(item)}</span>
              <button
                type="button"
                className="deck-section__row-remove"
                onClick={() => onRemove(item.id)}
                aria-label={`Remover ${renderLabel(item)}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
