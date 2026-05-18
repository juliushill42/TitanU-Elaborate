import { useState } from 'react';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import GlossaryFeed from './components/GlossaryFeed.jsx';
import AgentLab from './components/AgentLab.jsx';

export default function App() {
  const [tab, setTab] = useState('glossary');

  return (
    <div className="min-h-screen bg-mint flex flex-col" style={{ maxWidth: 480, margin: '0 auto' }}>
      <Header />
      <main className="flex-1 overflow-y-auto pb-20">
        {tab === 'glossary'  && <GlossaryFeed />}
        {tab === 'agentlab' && <AgentLab />}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
