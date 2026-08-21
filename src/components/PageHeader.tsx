import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function PageHeader({ icon, title, description, className = '' }: Props) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
        {icon}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-ink-900 tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-ink-500 max-w-2xl leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
