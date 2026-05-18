import { useState } from 'react';

const SLOTS = [
  { id: 's1', label: '1. Researcher Agent' },
  { id: 's2', label: '2. Math Agent' },
  { id: 's3', label: '3. Boss Agent' },
];

const INITIAL_PLUGINS = [
  { id: 'bloomberg', label: 'Bloomberg News Plugin', bg: '#D1FAE5', color: '#065F46', border: '#6EE7B7' },
  { id: 'stock',     label: 'Stock API Plugin',       bg: '#E0F2FE', color: '#075985', border: '#7DD3FC' },
  { id: 'sec',       label: 'SEC Data Plugin',        bg: '#EDE9FE', color: '#5B21B6', border: '#C4B5FD' },
];

const SUCCESS_EMOJIS = ['','','','','','','',''];

export default function AgentLab() {
  const [slots,    setSlots]    = useState({});           // slotId  plugin
  const [plugins,  setPlugins]  = useState(INITIAL_PLUGINS);
  const [deployed, setDeployed] = useState(false);
  const [particles, setParticles] = useState([]);

  const filledCount = Object.keys(slots).length;
  const allFilled   = filledCount === SLOTS.length;

  const assignPlugin = (plugin) => {
    const emptySlot = SLOTS.find((s) => !slots[s.id]);
    if (!emptySlot) return;
    setSlots((prev) => ({ ...prev, [emptySlot.id]: plugin }));
    setPlugins((prev) => prev.filter((p) => p.id !== plugin.id));
  };

  const removePlugin = (slotId) => {
    const plugin = slots[slotId];
    if (!plugin) return;
    setSlots((prev) => { const n = { ...prev }; delete n[slotId]; return n; });
    setPlugins((prev) => [...prev, plugin]);
  };

  const deploy = () => {
    const p = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 78 + 6}%`,
      delay: `${(Math.random() * 0.6).toFixed(2)}s`,
      emoji: SUCCESS_EMOJIS[Math.floor(Math.random() * SUCCESS_EMOJIS.length)],
    }));
    setParticles(p);
    setDeployed(true);
  };

  const reset = () => {
    setSlots({});
    setPlugins(INITIAL_PLUGINS);
    setDeployed(false);
    setParticles([]);
  };

  /*  Success screen  */
  if (deployed) return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 overflow-hidden">
      {particles.map((p) => (
        <span key={p.id} className="particle absolute text-2xl pointer-events-none"
          style={{ left: p.left, bottom: '28%', animationDelay: p.delay }}>
          {p.emoji}
        </span>
      ))}
      <div className="z-10 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg pulse-glow"
          style={{ background: '#FEF08A' }}>
          <span className="text-4xl"></span>
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: '#333' }}>Swarm Deployed!</h2>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto mb-8">
          Success! Your Swarm is now researching, analyzing, and trading.{' '}
          <strong>Wall Street, watch out!</strong>
        </p>
        <button onClick={reset}
          className="px-6 py-3 rounded-2xl font-semibold shadow-md active:scale-95 transition-transform text-sm"
          style={{ background: '#E0F2FE', color: '#333' }}>
           Rebuild Swarm
        </button>
      </div>
    </div>
  );

  /*  Builder screen  */
  return (
    <div className="px-4 py-5">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold" style={{ color: '#333' }}>Build a Wall Street Swarm</h2>
        <p className="text-xs text-gray-500 mt-1">Click a plugin to assign it to the next empty slot</p>
      </div>

      {/* Slots */}
      <div className="space-y-3 mb-8">
        {SLOTS.map((slot) => {
          const plugin = slots[slot.id];
          return (
            <div key={slot.id}
              onClick={() => plugin && removePlugin(slot.id)}
              className={`relative h-[72px] rounded-2xl flex items-center justify-center transition-all duration-300
                ${plugin ? 'shadow-md cursor-pointer active:scale-95' : 'border-2 border-dashed border-gray-300 bg-gray-50'}`}
              style={plugin ? { background: '#E0F2FE', border: '2px solid #7DD3FC' } : {}}>
              {plugin ? (
                <div className="text-center">
                  <p className="text-sm font-bold" style={{ color: '#333' }}>{plugin.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Tap to remove</p>
                </div>
              ) : (
                <span className="text-sm font-medium text-gray-400">{slot.label}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-5 px-1">
        <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full rounded-full bg-emerald-400 transition-all duration-500"
            style={{ width: `${(filledCount / SLOTS.length) * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-gray-500">{filledCount}/{SLOTS.length}</span>
      </div>

      {/* Parts bin */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 text-center">
          Plugin Bin
        </p>
        <div className="flex flex-wrap justify-center gap-3 min-h-[48px]">
          {plugins.map((p) => (
            <button key={p.id} onClick={() => assignPlugin(p)}
              className="px-4 py-2.5 rounded-full text-sm font-semibold border-2 shadow-sm active:scale-95 transition-transform"
              style={{ background: p.bg, color: p.color, borderColor: p.border }}>
              {p.label}
            </button>
          ))}
          {plugins.length === 0 && (
            <p className="text-xs text-gray-400 self-center">All plugins assigned </p>
          )}
        </div>
      </div>

      {/* Deploy button  appears when all slots filled */}
      {allFilled && (
        <button onClick={deploy}
          className="w-full h-14 rounded-2xl font-bold text-base shadow-lg pulse-glow active:scale-95 transition-transform"
          style={{ background: '#FEF08A', color: '#333' }}>
           Deploy Hedge Fund Swarm
        </button>
      )}
    </div>
  );
}
