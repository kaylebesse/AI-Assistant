import { Sparkles } from 'lucide-react';

interface Props {
  label?: string;
  className?: string;
}

export default function GeneratingState({ label = 'Generating', className = '' }: Props) {
  return (
    <div className={`flex items-center gap-3 text-ink-500 ${className}`} role="status" aria-live="polite">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-4 w-4 text-brand-500 animate-pulse-soft" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="flex items-center gap-1 text-brand-500">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </span>
    </div>
  );
}
