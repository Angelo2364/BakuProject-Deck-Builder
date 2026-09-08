const TABS = [
  { id: 'bakugan', label: 'Bakugans' },
  { id: 'ability', label: 'Cartas de Habilidade' },
  { id: 'gate', label: 'Cartas de Portão' },
];

export default function Tabs({ active, onChange, counts }) {
  return (
    <div className="tabs" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`tabs__item ${active === tab.id ? 'is-active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {counts && <span className="tabs__count">{counts[tab.id]}</span>}
        </button>
      ))}
    </div>
  );
}
