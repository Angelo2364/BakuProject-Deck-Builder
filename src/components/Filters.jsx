import { ATTRIBUTES, NEUTRAL_FILTER } from '../constants';
import { ATTRIBUTE_ICONS } from '../data/attributeIcons';

// `categoryOptions` é opcional -> só aparece nas abas de Habilidade e Portão.
// `showNeutral` liga o chip "Neutro", pra cartas sem atributo fixo (algumas
// Habilidades Especiais e cartas de Função). Não faz sentido na aba Bakugan.
//
// Os chips de atributo mostram o SÍMBOLO do elemento (ver data/attributeIcons.js).
// Enquanto o ícone daquele atributo não tiver sido preenchido, cai de volta
// pro nome escrito, então o filtro funciona normalmente mesmo sem as artes.
export default function Filters({
  search,
  onSearchChange,
  activeAttribute,
  onAttributeChange,
  categoryOptions,
  activeCategory,
  onCategoryChange,
  showNeutral,
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
        {ATTRIBUTES.map((attr) => {
          const icon = ATTRIBUTE_ICONS[attr];
          return (
            <button
              key={attr}
              type="button"
              className={`filters__chip filters__chip--${attr} ${icon ? 'filters__chip--icon' : ''} ${
                activeAttribute === attr ? 'is-active' : ''
              }`}
              onClick={() => onAttributeChange(attr)}
              aria-label={attr}
              title={attr}
            >
              {icon ? <img src={icon} alt={attr} /> : attr}
            </button>
          );
        })}
        {showNeutral && (
          <button
            type="button"
            className={`filters__chip filters__chip--neutral ${activeAttribute === NEUTRAL_FILTER ? 'is-active' : ''}`}
            onClick={() => onAttributeChange(NEUTRAL_FILTER)}
          >
            Neutro
          </button>
        )}
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
