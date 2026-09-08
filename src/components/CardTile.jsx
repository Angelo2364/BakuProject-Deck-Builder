import { ATTRIBUTE_COLORS } from '../constants';

// Tile genérico de carta: usado pra Bakugans, Cartas de Portão e Habilidades.
// `attribute` controla a cor de destaque; passe null pra cartas neutras (função, etc).
export default function CardTile({
  image,
  name,
  attribute,
  tag,
  description,
  meta,
  qty = 0,
  onAdd,
  onRemove,
  addDisabled,
}) {
  const accent = attribute ? ATTRIBUTE_COLORS[attribute] : '#5a5a66';

  return (
    <div className="card-tile" style={{ '--accent': accent }}>
      <div className="card-tile__art">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <div className="card-tile__art-placeholder">{name?.[0] ?? '?'}</div>
        )}
        {attribute && <span className="card-tile__attribute">{attribute}</span>}
      </div>

      <div className="card-tile__body">
        <div className="card-tile__heading">
          <h3>{name}</h3>
          {tag && <span className="card-tile__tag">{tag}</span>}
        </div>
        {meta && <p className="card-tile__meta">{meta}</p>}
        {description && <p className="card-tile__description">{description}</p>}
      </div>

      <div className="card-tile__controls">
        <button
          type="button"
          className="card-tile__btn card-tile__btn--remove"
          onClick={onRemove}
          disabled={qty === 0}
          aria-label={`Remover ${name} do deck`}
        >
          −
        </button>
        <span className="card-tile__qty">{qty}</span>
        <button
          type="button"
          className="card-tile__btn card-tile__btn--add"
          onClick={onAdd}
          disabled={addDisabled}
          aria-label={`Adicionar ${name} ao deck`}
        >
          +
        </button>
      </div>
    </div>
  );
}
