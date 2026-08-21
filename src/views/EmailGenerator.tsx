import { useState } from 'react';
import { Mail, Sparkles, Wand2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import CopyButton from '@/components/CopyButton';
import GeneratingState from '@/components/GeneratingState';
import AIDisclaimer from '@/components/AIDisclaimer';
import FormattedOutput from '@/components/FormattedOutput';
import {
  generateEmail,
  runWithDelay,
  type EmailTone,
  type EmailAudience,
} from '@/lib/aiEngine';

const tones: { id: EmailTone; label: string }[] = [
  { id: 'professional', label: 'Professional' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'persuasive', label: 'Persuasive' },
  { id: 'apologetic', label: 'Apologetic' },
  { id: 'assertive', label: 'Assertive' },
];

const audiences: { id: EmailAudience; label: string }[] = [
  { id: 'client', label: 'Client' },
  { id: 'manager', label: 'Manager' },
  { id: 'team', label: 'Team' },
  { id: 'vendor', label: 'Vendor' },
  { id: 'customer', label: 'Customer' },
];

export default function EmailGenerator() {
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState<EmailTone>('professional');
  const [audience, setAudience] = useState<EmailAudience>('client');
  const [keyPoints, setKeyPoints] = useState('');
  const [senderName, setSenderName] = useState('Alex Kim');
  const [senderRole, setSenderRole] = useState('Project Manager');
  const [callToAction, setCallToAction] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const canGenerate = purpose.trim().length > 1;

  const onGenerate = async () => {
    if (!canGenerate || loading) return;
    setLoading(true);
    setOutput('');
    const result = await runWithDelay(() =>
      generateEmail({
        purpose,
        tone,
        audience,
        keyPoints,
        senderName,
        senderRole,
        callToAction,
      })
    );
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<Mail className="h-6 w-6" />}
        title="Smart Email Generator"
        description="Draft polished, ready-to-send emails tailored by tone and audience. Add your context and let AI structure it professionally."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Wand2 className="h-4 w-4 text-brand-500" />
            <h3 className="font-bold text-ink-900">Email details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">Purpose of the email</label>
              <input
                className="input"
                placeholder="e.g. Follow up on the product demo"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Tone</label>
                <div className="flex flex-wrap gap-1.5">
                  {tones.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`chip ${
                        tone === t.id
                          ? 'bg-brand-600 text-white'
                          : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Audience</label>
                <div className="flex flex-wrap gap-1.5">
                  {audiences.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAudience(a.id)}
                      className={`chip ${
                        audience === a.id
                          ? 'bg-ink-900 text-white'
                          : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="label">Key points to include</label>
              <textarea
                className="input min-h-[90px] resize-y"
                placeholder="One point per line — e.g. demo went well, next step is pricing review"
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Your name</label>
                <input className="input" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
              </div>
              <div>
                <label className="label">Your role</label>
                <input className="input" value={senderRole} onChange={(e) => setSenderRole(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label">Call to action</label>
              <input
                className="input"
                placeholder="e.g. Reply by Friday with availability"
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
              />
            </div>

            <button
              onClick={onGenerate}
              disabled={!canGenerate || loading}
              className="btn-primary w-full py-2.5"
            >
              <Sparkles className="h-4 w-4" /> Generate email
            </button>
          </div>
        </Card>

        {/* Output */}
        <Card className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-ink-900">Generated email</h3>
            {output && <CopyButton text={output} />}
          </div>

          <div className="flex-1 min-h-[280px]">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <GeneratingState label="Drafting your email" />
              </div>
            ) : output ? (
              <div className="rounded-xl bg-ink-50 p-5 animate-scale-in">
                <FormattedOutput text={output} />
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
        <Mail className="h-7 w-7" />
      </div>
      <p className="mt-4 text-sm font-semibold text-ink-600">Your email will appear here</p>
      <p className="mt-1 text-xs text-ink-400 max-w-xs">
        Fill in the details and click Generate to draft a professional email.
      </p>
    </div>
  );
}
