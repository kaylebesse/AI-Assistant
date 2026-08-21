import { Menu, Search, Bell } from 'lucide-react';

interface Props {
  onOpenMobile: () => void;
  title: string;
}

export default function Topbar({ onOpenMobile, title }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-100 bg-white/80 px-4 backdrop-blur-md lg:px-8">
      <button
        onClick={onOpenMobile}
        className="lg:hidden btn-ghost h-9 w-9 p-0"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h2 className="text-base font-bold text-ink-900 lg:hidden">{title}</h2>

      <div className="ml-auto hidden items-center gap-2 lg:flex">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search workspace…"
            className="input pl-9 py-2 w-64"
          />
        </div>
        <button className="btn-ghost h-9 w-9 p-0" aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-ink-50 py-1 pl-1 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
            AK
          </div>
          <span className="text-xs font-semibold text-ink-700">Alex K.</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
          AK
        </div>
      </div>
    </header>
  );
}
