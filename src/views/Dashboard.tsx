import {
  Mail,
  FileText,
  ListChecks,
  Microscope,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { NAV_ITEMS, type ViewId } from '@/lib/nav';
import Card from '@/components/Card';

interface Props {
  onNavigate: (id: ViewId) => void;
}

const stats = [
  { label: 'Emails drafted', value: '12', icon: Mail, trend: '+4 this week', color: 'brand' },
  { label: 'Meetings summarized', value: '8', icon: FileText, trend: '+2 today', color: 'accent' },
  { label: 'Tasks planned', value: '23', icon: ListChecks, trend: '+7 this week', color: 'warn' },
  { label: 'Research briefs', value: '5', icon: Microscope, trend: '+1 today', color: 'brand' },
] as const;

const colorMap: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-600 ring-brand-100',
  accent: 'bg-accent-50 text-accent-600 ring-accent-100',
  warn: 'bg-warn-50 text-warn-600 ring-warn-100',
};

export default function Dashboard({ onNavigate }: Props) {
  const features = NAV_ITEMS.filter((n) => n.id !== 'dashboard');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink-900 via-ink-900 to-brand-950 p-6 lg:p-8 text-white">
        <div className="relative z-10 max-w-2xl">
          <span className="chip bg-white/10 text-white ring-1 ring-white/15">
            <Zap className="h-3 w-3" /> AI-powered workspace
          </span>
          <h1 className="mt-3 text-2xl lg:text-3xl font-extrabold tracking-tight">
            Good morning, Alex. Let's make today productive.
          </h1>
          <p className="mt-2 text-sm text-ink-300 leading-relaxed">
            Automate your daily work — draft emails, summarize meetings, plan your tasks, research
            topics, and chat with AI. All in one place.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => onNavigate('email')} className="btn bg-white text-ink-900 hover:bg-ink-100 px-4 py-2 text-sm">
              Draft an email <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => onNavigate('planner')} className="btn bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15 px-4 py-2 text-sm">
              Plan my day
            </button>
          </div>
        </div>
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5 card-hover">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${colorMap[s.color]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-ink-400">{s.trend}</span>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-ink-900">{s.value}</p>
              <p className="text-sm text-ink-500">{s.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Feature grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-ink-900">AI Tools</h2>
          <span className="text-xs font-semibold text-ink-400">{features.length} assistants</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-left"
              >
                <Card className="p-5 h-full card-hover group">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 group-hover:bg-brand-100 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink-900">{item.label}</h3>
                  <p className="mt-1 text-sm text-ink-500 leading-relaxed">{item.description}</p>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity + tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-brand-500" />
            <h3 className="font-bold text-ink-900">Recent activity</h3>
          </div>
          <ul className="space-y-3">
            {[
              { icon: Mail, text: 'Drafted a follow-up email to Acme Corp', time: '2h ago', color: 'text-brand-500' },
              { icon: FileText, text: 'Summarized Q3 planning meeting notes', time: '5h ago', color: 'text-accent-500' },
              { icon: ListChecks, text: 'Generated a prioritized task plan for today', time: 'Yesterday', color: 'text-warn-500' },
              { icon: Microscope, text: 'Researched "AI adoption in mid-market"', time: 'Yesterday', color: 'text-brand-500' },
            ].map((a, i) => {
              const Icon = a.icon;
              return (
                <li key={i} className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 shrink-0 ${a.color}`} />
                  <span className="text-sm text-ink-700 flex-1">{a.text}</span>
                  <span className="text-xs text-ink-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {a.time}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-4 w-4 text-accent-500" />
            <h3 className="font-bold text-ink-900">Productivity tips</h3>
          </div>
          <ul className="space-y-3 text-sm text-ink-600 leading-relaxed">
            <li className="flex gap-2"><span className="text-brand-400">•</span> Batch similar tasks to reduce context-switching.</li>
            <li className="flex gap-2"><span className="text-brand-400">•</span> Summarize meetings right after they end.</li>
            <li className="flex gap-2"><span className="text-brand-400">•</span> Always review AI output before sending.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
