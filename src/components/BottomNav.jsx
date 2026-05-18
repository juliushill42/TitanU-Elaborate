const TABS = [
  {
    key: 'glossary',
    label: 'Glossary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    key: 'agentlab',
    label: 'Agent Lab',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
    ),
  },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur border-t border-emerald-100 shadow-lg"
      style={{ width: '100%', maxWidth: 480 }}>
      <div className="flex h-16">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 text-xs font-semibold transition-colors duration-200
                ${isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-500'}`}
            >
              {t.icon}
              <span>{t.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
