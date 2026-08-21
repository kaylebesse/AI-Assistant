import { X } from 'lucide-react';
import { NAV_ITEMS, type ViewId } from '@/lib/nav';

interface Props {
  active: ViewId;
  onNavigate: (id: ViewId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ active, onNavigate, mobileOpen, onCloseMobile }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink-950/40 backdrop-blur-sm lg:hidden animate-fade-in-fast"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 border-r border-ink-100 bg-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-ink-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-ink-900 tracking-tight">FlowAI</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                Productivity Suite
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden btn-ghost h-8 w-8 p-0"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-ink-400">
            Workspace
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-100'
                        : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                    }`}
                  >
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 ${
                        isActive ? 'text-brand-600' : 'text-ink-400 group-hover:text-ink-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer card */}
        <div className="px-3 pb-4">
          <div className="rounded-xl bg-gradient-to-br from-ink-900 to-ink-950 p-4 text-white">
            <p className="text-sm font-bold">Pro tip</p>
            <p className="mt-1 text-xs text-ink-300 leading-relaxed">
              Use specific context in your inputs for sharper, more useful AI outputs.
            </p>
          </div>
          <p className="mt-3 px-1 text-[10px] text-ink-400 leading-relaxed">
            FlowAI is a prototype. AI-generated content may require human review.
          </p>
        </div>
      </aside>
    </>
  );
}
