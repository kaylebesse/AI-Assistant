interface Props {
  text: string;
  className?: string;
}

// Renders a simple markdown-ish subset: **bold**, bullet lines starting with -, and blank lines.
export default function FormattedOutput({ text, className = '' }: Props) {
  const blocks = text.split('\n').map((raw, idx) => {
    const line = raw.trimEnd();
    if (line.trim() === '') return <div key={idx} className="h-3" />;
    if (line.startsWith('• ') || line.startsWith('- ')) {
      return (
        <div key={idx} className="flex gap-2 text-sm text-ink-700 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
          <span>{renderInline(line.slice(2))}</span>
        </div>
      );
    }
    return (
      <p key={idx} className="text-sm text-ink-700 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  });

  return <div className={`space-y-1 ${className}`}>{blocks}</div>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-ink-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
