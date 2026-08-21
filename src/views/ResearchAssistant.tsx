import { useState } from 'react';
import { Microscope, Sparkles, Lightbulb, Compass, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import CopyButton from '@/components/CopyButton';
import GeneratingState from '@/components/GeneratingState';
import AIDisclaimer from '@/components/AIDisclaimer';
import { researchTopic, runWithDelay, type ResearchResult } from '@/lib/aiEngine';

type Depth = 'brief' | 'standard' | 'detailed';

const depths: { id: Depth; label: string; desc: string }[] = [
  { id: 'brief', label: 'Brief', desc: 'Quick overview' },
  { id: 'standard', label: 'Standard', desc: 'Balanced detail' },
  { id: 'detailed', label: 'Detailed', desc: 'In-depth analysis' },
];

export default function ResearchAssistant() {
  const [topic, setTopic] = useState('');
  const [focus, setFocus] = useState('');
  const [depth, setDepth] = useState<Depth>('standard');
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const canGenerate = topic.trim().length > 1;

  const onGenerate = async () => {
    if (!canGenerate || loading) return;
    setLoading(true);
    setResult(null);
    const r = await runWithDelay(() => researchTopic({ topic, focus, depth }));
    setResult(r);
    setLoading(false);
  };

  const fullText = result
    ? [
        `Overview: ${result.overview}`,
        '',
        'Key Insights:',
        ...result.keyInsights.map((p) => `- ${p}`),
        '',
        'Considerations:',
        ...result.considerations.map((p) => `- ${p}`),
        '',
        'Recommended Next Steps:',
        ...result.nextSteps.map((p) => `- ${p}`),
      ].join('\n')
    : '';

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<Microscope className="h-6 w-6" />}
        title="AI Research Assistant"
        description="Get a structured research brief on any topic — overview, key insights, considerations, and recommended next steps."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Microscope className="h-4 w-4 text-brand-500" />
            <h3 className="font-bold text-ink-900">Research query</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">Topic</label>
              <input
                className="input"
                placeholder="e.g. AI adoption in mid-market companies"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Focus area</label>
              <input
                className="input"
                placeholder="e.g. cost-benefit and implementation"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Depth</label>
              <div className="grid grid-cols-3 gap-2">
                {depths.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDepth(d.id)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      depth === d.id
                        ? 'border-brand-400 bg-brand-50 ring-2 ring-brand-100'
                        : 'border-ink-200 bg-white hover:bg-ink-50'
                    }`}
                  >
                    <p className="text-sm font-bold text-ink-900">{d.label}</p>
                    <p className="text-xs text-ink-500">{d.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onGenerate}
              disabled={!canGenerate || loading}
              className="btn-primary w-full py-2.5"
            >
              <Sparkles className="h-4 w-4" /> Research topic
            </button>
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-ink-900">Research brief</h3>
            {result && <CopyButton text={fullText} label="Copy brief" />}
          </div>

          <div className="flex-1 min-h-[280px]">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <GeneratingState label="Researching topic" />
              </div>
            ) : result ? (
              <div className="space-y-5 animate-scale-in">
                <Section title="Overview" icon={<Microscope className="h-3.5 w-3.5" />}>
                  <p className="text-sm text-ink-700 leading-relaxed">{result.overview}</p>
                </Section>
                <Section title="Key Insights" icon={<Lightbulb className="h-3.5 w-3.5" />}>
                  <BulletList items={result.keyInsights} accent />
                </Section>
                <Section title="Considerations" icon={<AlertTriangle className="h-3.5 w-3.5" />}>
                  <BulletList items={result.considerations} />
                </Section>
                <Section title="Recommended Next Steps" icon={<Compass className="h-3.5 w-3.5" />}>
                  <BulletList items={result.nextSteps} accent />
                </Section>
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

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-brand-500">{icon}</span>
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500">{title}</h4>
      </div>
      <div className="rounded-lg bg-ink-50 p-3 space-y-1.5">{children}</div>
    </div>
  );
}

function BulletList({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-ink-700 leading-relaxed">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent ? 'bg-brand-500' : 'bg-ink-300'}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
        <Microscope className="h-7 w-7" />
      </div>
      <p className="mt-4 text-sm font-semibold text-ink-600">Your research brief will appear here</p>
      <p className="mt-1 text-xs text-ink-400 max-w-xs">
        Enter a topic and click Research to get a structured brief.
      </p>
    </div>
  );
}
