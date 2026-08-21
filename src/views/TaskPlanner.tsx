import { useState } from 'react';
import { ListChecks, Sparkles, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import CopyButton from '@/components/CopyButton';
import GeneratingState from '@/components/GeneratingState';
import AIDisclaimer from '@/components/AIDisclaimer';
import { planTasks, runWithDelay, type TaskPlan } from '@/lib/aiEngine';

const priorityStyles: Record<string, string> = {
  High: 'bg-danger-50 text-danger-600 ring-danger-100',
  Med: 'bg-warn-50 text-warn-600 ring-warn-100',
  Low: 'bg-accent-50 text-accent-600 ring-accent-100',
};

export default function TaskPlanner() {
  const [rawTasks, setRawTasks] = useState('');
  const [workHours, setWorkHours] = useState('9:00–17:00');
  const [deadlines, setDeadlines] = useState('');
  const [priorities, setPriorities] = useState('');
  const [plan, setPlan] = useState<TaskPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const canGenerate = rawTasks.trim().length > 3;

  const onGenerate = async () => {
    if (!canGenerate || loading) return;
    setLoading(true);
    setPlan(null);
    const r = await runWithDelay(() => planTasks({ rawTasks, workHours, deadlines, priorities }));
    setPlan(r);
    setLoading(false);
  };

  const fullText = plan
    ? [
        "Today's Plan:",
        ...plan.schedule.map((t) => `- ${t.time} — ${t.title} [${t.priority}]`),
        '',
        'Priority Queue:',
        ...plan.priorityQueue.map((t) => `- ${t.n}. ${t.title} (${t.priority}) — ${t.rationale}`),
        '',
        'Defer / Delegate:',
        ...plan.deferDelegate.map((t) => `- ${t}`),
        '',
        'Notes:',
        ...plan.notes.map((t) => `- ${t}`),
      ].join('\n')
    : '';

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<ListChecks className="h-6 w-6" />}
        title="AI Task Planner"
        description="Turn a raw task list into a prioritized, time-blocked schedule. AI ranks by urgency and importance, then fits your day."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <ListChecks className="h-4 w-4 text-brand-500" />
            <h3 className="font-bold text-ink-900">Your tasks</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">Tasks (one per line)</label>
              <textarea
                className="input min-h-[160px] resize-y"
                placeholder={`Prepare quarterly report\nReview team OKRs\nClient follow-up call\nInbox triage\nUpdate project tracker`}
                value={rawTasks}
                onChange={(e) => setRawTasks(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-ink-400" /> Work hours</label>
                <input className="input" value={workHours} onChange={(e) => setWorkHours(e.target.value)} />
              </div>
              <div>
                <label className="label">Deadlines</label>
                <input
                  className="input"
                  placeholder="e.g. Report due Friday"
                  value={deadlines}
                  onChange={(e) => setDeadlines(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="label">Priority notes</label>
              <input
                className="input"
                placeholder="e.g. Client call is most urgent"
                value={priorities}
                onChange={(e) => setPriorities(e.target.value)}
              />
            </div>

            <button
              onClick={onGenerate}
              disabled={!canGenerate || loading}
              className="btn-primary w-full py-2.5"
            >
              <Sparkles className="h-4 w-4" /> Plan my day
            </button>
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-ink-900">Your plan</h3>
            {plan && <CopyButton text={fullText} label="Copy plan" />}
          </div>

          <div className="flex-1 min-h-[280px]">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <GeneratingState label="Prioritizing tasks" />
              </div>
            ) : plan ? (
              <div className="space-y-5 animate-scale-in">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-brand-500" /> Today's Schedule
                  </h4>
                  <div className="space-y-1.5">
                    {plan.schedule.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-ink-50 px-3 py-2">
                        <span className="font-mono text-xs font-semibold text-ink-500 w-28 shrink-0">{t.time}</span>
                        <span className="text-sm text-ink-800 flex-1">{t.title}</span>
                        <span className={`chip text-[10px] ring-1 ${priorityStyles[t.priority]}`}>{t.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-brand-500" /> Priority Queue
                  </h4>
                  <ol className="space-y-1.5">
                    {plan.priorityQueue.map((t) => (
                      <li key={t.n} className="flex gap-2.5 rounded-lg bg-ink-50 px-3 py-2">
                        <span className="font-bold text-brand-600 text-sm">{t.n}.</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-ink-800">{t.title}</span>
                            <span className={`chip text-[10px] ring-1 ${priorityStyles[t.priority]}`}>{t.priority}</span>
                          </div>
                          <p className="text-xs text-ink-500 mt-0.5">{t.rationale}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2 flex items-center gap-1.5">
                    <ArrowRight className="h-3.5 w-3.5 text-ink-400" /> Defer / Delegate
                  </h4>
                  <ul className="space-y-1">
                    {plan.deferDelegate.map((t, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink-600 px-3">
                        <span className="text-ink-300">•</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-warn-500" /> Notes
                  </h4>
                  <ul className="space-y-1">
                    {plan.notes.map((t, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink-600 px-3">
                        <span className="text-ink-300">•</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>

          <AIDisclaimer className="mt-5" />
        </Card>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
        <ListChecks className="h-7 w-7" />
      </div>
      <p className="mt-4 text-sm font-semibold text-ink-600">Your plan will appear here</p>
      <p className="mt-1 text-xs text-ink-400 max-w-xs">
        List your tasks and click Plan my day to get a prioritized schedule.
      </p>
    </div>
  );
}
