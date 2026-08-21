import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Dashboard from '@/views/Dashboard';
import EmailGenerator from '@/views/EmailGenerator';
import MeetingSummarizer from '@/views/MeetingSummarizer';
import TaskPlanner from '@/views/TaskPlanner';
import ResearchAssistant from '@/views/ResearchAssistant';
import Chatbot from '@/views/Chatbot';
import { NAV_ITEMS, type ViewId } from '@/lib/nav';

export default function App() {
  const [active, setActive] = useState<ViewId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (id: ViewId) => {
    setActive(id);
    setMobileOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const current = NAV_ITEMS.find((n) => n.id === active);

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar
        active={active}
        onNavigate={handleNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMobile={() => setMobileOpen(true)} title={current?.label ?? 'FlowAI'} />

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-6xl">
            {active === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
            {active === 'email' && <EmailGenerator />}
            {active === 'meeting' && <MeetingSummarizer />}
            {active === 'planner' && <TaskPlanner />}
            {active === 'research' && <ResearchAssistant />}
            {active === 'chatbot' && <Chatbot />}
          </div>
        </main>
      </div>
    </div>
  );
}
