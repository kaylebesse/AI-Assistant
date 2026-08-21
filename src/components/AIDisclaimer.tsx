import { AlertTriangle } from 'lucide-react';

export default function AIDisclaimer({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-start gap-2 rounded-lg bg-warn-50 border border-warn-100 px-3 py-2 ${className}`}>
      <AlertTriangle className="h-3.5 w-3.5 text-warn-600 mt-0.5 shrink-0" />
      <p className="text-xs text-warn-700 leading-relaxed">
        AI-generated content may require human review.
      </p>
    </div>
  );
}
