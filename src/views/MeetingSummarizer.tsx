import { useState } from 'react';
import { FileText, Sparkles, Calendar, Users, User, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import CopyButton from '@/components/CopyButton';
import GeneratingState from '@/components/GeneratingState';
import AIDisclaimer from '@/components/AIDisclaimer';
import { summarizeMeeting, runWithDelay, type MeetingResult } from '@/lib/aiEngine';

export default function MeetingSummarizer() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState<MeetingResult | null>(null);
  const [loading, setLoading] = useState(false);

  const canGenerate = notes.trim().length > 10;

  const onGenerate = async () => {
    if (!canGenerate || loading) return;
    setLoading(true);
    setResult(null);
    const r = await runWithDelay(() =>
      summarizeMeeting({ notes, meetingTitle, participants, date })
    );
    setResult(r);
    setLoading(false);
  };

  const fullText = result
    ? [
        `Summary: ${result.summary}`,
        '',
        'Key Points:',
        ...result.keyPoints.map((p) => `- ${p}`),
        '',
        'Action Items:',
        ...result.actionItems.map((p) => `- ${p}`),
        '',
        'Deadlines:',
        ...result.deadlines.map((p) => `- ${p}`),
        '',
        'Open Questions:',
        ...result.openQuestions.map((p) => `- ${p}`),
      ].join('\n')
    : '';

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<FileText className="h-6 w-6" />}
        title="Meeting Notes Summarizer"
        description="Paste your raw meeting notes and get a structured brief with key points, action items, deadlines, and open questions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <FileText className="h-4 w-4 text-brand-500" />
            <h3 className="font-bold text-ink-900">Meeting details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">Meeting title</label>
              <input
                className="input"
                placeholder="e.g. Q3 Product Roadmap Review"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-ink-400" /> Date</label>
                <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <label className="label flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-ink-400" /> Participants</label>
                <input
                  className="input"
                  placeholder="Comma separated"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="label">Raw notes</label>
              <textarea
                className="input min-h-[200px] resize-y font-mono text-xs leading-relaxed"
                placeholder={`Paste everything here — bullet points, fragments, action items, dates…\n\nExample:\n- Discussed launch timeline, target is Oct 15\n- Sarah to finalize pricing by Oct 1\n- Budget approved for marketing campaign\n- Need to confirm vendor contract before Oct 10`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              onClick={onGenerate}
              disabled={!canGenerate || loading}
              className="btn-primary w-full py-2.5"
            >
              <Sparkles className="h-4 w-4" /> Summarize meeting
            </button>
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-ink-900">Structured summary</h3>
            {result && <CopyButton text={fullText} label="Copy summary" />}
          </div>

          <div className="flex-1 min-h-[280px]">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <GeneratingState label="Analyzing notes" />
              </div>
            ) : result ? (
              <div className="space-y-5 animate-scale-in">
                <Section title="Summary" icon={<FileText className="h-3.5 w-3.5" />}>
                  <p className="text-sm text-ink-700 leading-relaxed">{result.summary}</p>
                </Section>
                <Section title="Key Points" icon={<Sparkles className="h-3.5 w-3.5" />}>
                  <BulletList items={result.keyPoints} />
                </Section>
                <Section title="Action Items" icon={<User className="h-3.5 w-3.5" />}>
                  <BulletList items={result.actionItems} accent />
                </Section>
                <Section title="Deadlines" icon={<Calendar className="h-3.5 w-3.5" />}>
                  <BulletList items={result.deadlines} />
                </Section>
                <Section title="Open Questions" icon={<AlertCircle className="h-3.5 w-3.5" />}>
                  <BulletList items={result.openQuestions} />
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
        <FileText className="h-7 w-7" />
      </div>
      <p className="mt-4 text-sm font-semibold text-ink-600">Your summary will appear here</p>
      <p className="mt-1 text-xs text-ink-400 max-w-xs">
        Paste your raw meeting notes and click Summarize.
      </p>
    </div>
  );
}
