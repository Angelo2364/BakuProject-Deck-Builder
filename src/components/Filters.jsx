import { useState } from 'react';
import { ATTRIBUTES, NEUTRAL_FILTER } from '../constants';
import { ATTRIBUTE_ICONS } from '../data/attributeIcons';

// `categoryOptions` é opcional -> só aparece nas abas de Habilidade e Portão.
// `showNeutral` liga o chip "Neutro", pra cartas sem atributo fixo (algumas
// Habilidades Especiais e cartas de Função). Não faz sentido na aba Bakugan.
//
// Os chips de atributo mostram o SÍMBOLO do elemento (data/attributeIcons.js).
// Se o arquivo daquele ícone ainda não existir em public/icons/ (ou o campo
// estiver vazio), o chip cai pro nome escrito sozinho — então o filtro
// funciona normalmente mesmo enquanto você for adicionando os SVGs aos poucos.
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
  const [brokenIcons, setBrokenIcons] = useState({});

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
          const iconPath = ATTRIBUTE_ICONS[attr];
          const showIcon = Boolean(iconPath) && !brokenIcons[attr];
          return (
            <button
              key={attr}
              type="button"
              className={`filters__chip filters__chip--${attr} ${showIcon ? 'filters__chip--icon' : ''} ${
                activeAttribute === attr ? 'is-active' : ''
              }`}
              onClick={() => onAttributeChange(attr)}
              aria-label={attr}
              title={attr}
            >
              {showIcon ? (
                <img
                  src={iconPath}
                  alt={attr}
                  onError={() => setBrokenIcons((prev) => ({ ...prev, [attr]: true }))}
                />
              ) : (
                attr
              )}
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
