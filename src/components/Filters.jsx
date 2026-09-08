import { ATTRIBUTES } from '../constants';

// `categoryOptions` é opcional -> só aparece nas abas de Habilidade e Portão.
export default function Filters({
  search,
  onSearchChange,
  activeAttribute,
  onAttributeChange,
  categoryOptions,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="filters">
      <input
        type="search"
        className="filters__search"
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="filters__attributes">
        <button
          type="button"
          className={`filters__chip ${activeAttribute === null ? 'is-active' : ''}`}
          onClick={() => onAttributeChange(null)}
        >
          Todos
        </button>
        {ATTRIBUTES.map((attr) => (
          <button
            key={attr}
            type="button"
            className={`filters__chip filters__chip--${attr} ${activeAttribute === attr ? 'is-active' : ''}`}
            onClick={() => onAttributeChange(attr)}
          >
            {attr}
          </button>
        ))}
      </div>

      {categoryOptions && (
        <div className="filters__categories">
          <button
            type="button"
            className={`filters__chip ${activeCategory === null ? 'is-active' : ''}`}
            onClick={() => onCategoryChange(null)}
          >
            Todas
          </button>
          {categoryOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`filters__chip ${activeCategory === opt.value ? 'is-active' : ''}`}
              onClick={() => onCategoryChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
