import { DECK_LIMITS, ATTRIBUTE_COLORS } from '../constants';

// Painel visual do deck: 3 blocos (Bakugan / Portão / Habilidade), cada um
// com um número fixo de "slots" (= o limite daquela seção). Slots ocupados
// mostram a carta; slots vazios ficam tracejados. Clicar num slot ocupado
// remove 1 cópia daquela carta.
//
// `entries` já vem resolvido como [{ item, qty }] (ver DeckBuilder.jsx).
// Aqui expandimos qty em slots individuais: uma Habilidade com qty 3 ocupa
// 3 slots (mesma arte repetida) — é assim que fica mais parecido com o jogo
// físico/print de referência.
export default function DeckSlots({ bakuganEntries, gateEntries, abilityEntries, onRemove }) {
  return (
    <div className="deck-slots">
      <SlotPanel
        title="Ability Cards"
        section="ability"
        limit={DECK_LIMITS.ability}
        entries={abilityEntries}
        onRemove={onRemove}
        variant="card"
      />
      <SlotPanel
        title="Gate Cards"
        section="gate"
        limit={DECK_LIMITS.gate}
        entries={gateEntries}
        onRemove={onRemove}
        variant="card"
      />
      <SlotPanel
        title="Bakugan"
        section="bakugan"
        limit={DECK_LIMITS.bakugan}
        entries={bakuganEntries}
        onRemove={onRemove}
        variant="bakugan"
      />
    </div>
  );
}

function expandToSlots(entries, limit) {
  const filled = entries.flatMap(({ item, qty }) => Array.from({ length: qty }, () => item));
  const empty = Array.from({ length: Math.max(0, limit - filled.length) }, () => null);
  return [...filled, ...empty];
}

function SlotPanel({ title, section, limit, entries, onRemove, variant }) {
  const slots = expandToSlots(entries, limit);
  const filledCount = entries.reduce((acc, e) => acc + e.qty, 0);

  return (
    <section className="slot-panel">
      <div className="slot-panel__title">
        <span>{title}</span>
        <span className="slot-panel__count">
          {filledCount}/{limit}
        </span>
      </div>

      <div className={`slot-panel__grid slot-panel__grid--${variant}`}>
        {slots.map((item, i) =>
          item ? (
            <button
              key={`${item.id}-${i}`}
              type="button"
              className={`deck-slot deck-slot--filled deck-slot--${variant}`}
              style={{ '--accent': ATTRIBUTE_COLORS[item.attribute] || '#5a5a66' }}
              onClick={() => onRemove(section, item.id)}
              title={`Remover ${item.name}`}
            >
  {item.image ? (
  <img src={item.image} alt={item.name} loading="lazy" />
) : (
  <span className="deck-slot__placeholder">{item.name[0]}</span>
)}

<span className="deck-slot__name">{item.name}</span>

{item.text && (
  <span className="deck-slot__tooltip">
    {item.text}
  </span>
)}

<span className="deck-slot__remove">×</span>
            </button>
          ) : (
            <div key={`empty-${i}`} className={`deck-slot deck-slot--empty deck-slot--${variant}`} />
          )
        )}
      </div>
    </section>
  );
}
