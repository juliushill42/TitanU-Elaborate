import { useState, useEffect } from 'react';

// Card colours cycle through these pairs [front-bg, back-bg]
const CARD_THEMES = [
  ['#E0F2FE', '#FEF08A'],
  ['#FEF08A', '#E0F2FE'],
  ['#D1FAE5', '#FEF08A'],
  ['#E0F2FE', '#D1FAE5'],
  ['#FCE7F3', '#FEF08A'],
];

export default function GlossaryFeed() {
  const [terms,    setTerms]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [flipped,  setFlipped]  = useState(new Set());

  useEffect(() => {
    fetch('/api/terms')
      .then((r) => { if (!r.ok) throw new Error('Failed to load'); return r.json(); })
      .then((d) => { setTerms(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  const toggle = (id) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-8 h-8 border-4 border-emerald-300 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-sm text-gray-500">Loading glossary</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <p className="text-red-500 text-sm font-semibold mb-1">Could not load terms</p>
      <p className="text-gray-400 text-xs">{error}</p>
    </div>
  );

  return (
    <div className="px-4 py-5 space-y-4">
      {/* Section header */}
      <div className="text-center mb-1">
        <h2 className="text-lg font-bold" style={{ color: '#333' }}>AI Concept Glossary</h2>
        <p className="text-xs text-gray-500 mt-1">Tap a card to flip and read the ELI5 analogy</p>
      </div>

      {/* Cards */}
      {terms.map((item, idx) => {
        const [frontBg, backBg] = CARD_THEMES[idx % CARD_THEMES.length];
        const isFlipped = flipped.has(item.id);
        const delay = `${(idx % 5) * 0.25}s`;

        return (
          <div
            key={item.id}
            className="flip-card float-card w-full cursor-pointer select-none"
            style={{ height: 140, animationDelay: delay }}
            onClick={() => toggle(item.id)}
          >
            <div className={`flip-card-inner${isFlipped ? ' flipped' : ''}`}>
              {/* Front */}
              <div className="flip-card-front shadow-md" style={{ background: frontBg }}>
                <div className="text-center">
                  <span className="inline-block px-2.5 py-0.5 bg-white/60 rounded-full text-[11px] font-bold text-emerald-700 mb-2">
                    #{String(item.id).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold" style={{ color: '#333' }}>{item.term}</h3>
                  <p className="text-[11px] text-gray-500 mt-1.5">Tap to reveal analogy</p>
                </div>
              </div>
              {/* Back */}
              <div className="flip-card-back shadow-md" style={{ background: backBg }}>
                <p className="text-sm font-medium leading-relaxed text-center" style={{ color: '#333' }}>
                  {item.analogy}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
