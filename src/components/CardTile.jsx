import { ATTRIBUTE_COLORS } from '../constants';

// Tile genérico de carta: usado pra Bakugans, Cartas de Portão e Habilidades.
// Agora é 100% clicável — clicar adiciona 1 cópia ao deck (até o limite).
// Pra remover, clica na carta dentro do painel do deck (DeckSlots.jsx).
export default function CardTile({
  image,
  name,
  attribute,
  tag,
  description,
  meta,
  qty = 0,
  maxCopies,
  onClick,
  disabled,
  highlighted,
}) {
  const accent = attribute ? ATTRIBUTE_COLORS[attribute] : '#5a5a66';
  const showCap = maxCopies && maxCopies !== Infinity && maxCopies > 1;

  return (
    <button
      type="button"
      className={`card-tile ${qty > 0 ? 'is-in-deck' : ''} ${disabled && qty === 0 ? 'is-disabled' : ''} ${
        highlighted ? 'card-tile--relevant' : ''
      }`}
      style={{ '--accent': accent }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="card-tile__art">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <div className="card-tile__art-placeholder">{name?.[0] ?? '?'}</div>
        )}
        {attribute && <span className="card-tile__attribute">{attribute}</span>}
        {qty > 0 && (
          <span className="card-tile__qty-badge">
            {qty}
            {showCap ? `/${maxCopies}` : ''}
          </span>
        )}
      </div>

      <div className="card-tile__body">
  <div className="card-tile__heading">
    <h3>{name}</h3>
    {tag && <span className="card-tile__tag">{tag}</span>}
  </div>

  {meta && <p className="card-tile__meta">{meta}</p>}

  {description && (
    <div className="card-tile__tooltip">
      {description}
    </div>
  )}
</div>
    </button>
  );
}
