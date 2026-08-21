import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, Sparkles, RotateCcw } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import AIDisclaimer from '@/components/AIDisclaimer';
import { chatReply, delay, type ChatMessage } from '@/lib/aiEngine';

const suggestions = [
  'Help me prioritize my tasks for today',
  'Draft a polite follow-up email to a client',
  'Summarize what a good meeting agenda looks like',
  'Tips for staying focused during deep work',
];

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const onSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: trimmed, ts: Date.now() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    await delay(900);
    const reply = chatReply(next);
    setMessages([...next, { role: 'assistant', content: reply, ts: Date.now() }]);
    setLoading(false);
  };

  const onReset = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<MessageSquare className="h-6 w-6" />}
        title="AI Chatbot"
        description="Ask anything about your work. FlowAI gives concise, practical answers and can help you draft, plan, and summarize."
      />

      <Card className="flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent-500 ring-2 ring-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink-900">FlowAI Assistant</p>
              <p className="text-xs text-accent-600 font-medium">Online</p>
            </div>
          </div>
          <button onClick={onReset} className="btn-ghost px-2.5 py-1.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-5 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
                <MessageSquare className="h-7 w-7" />
              </div>
              <p className="mt-4 text-sm font-semibold text-ink-700">How can I help you today?</p>
              <p className="mt-1 text-xs text-ink-400 max-w-sm">
                Try one of these, or type your own question.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => onSend(s)}
                    className="rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-left text-sm text-ink-700 hover:border-brand-300 hover:bg-brand-50 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <Message key={i} msg={m} />
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-ink-50 px-4 py-3">
                <span className="flex items-center gap-1 text-brand-500">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-ink-100 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              className="input flex-1"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={!input.trim() || loading} className="btn-primary h-[42px] px-4">
              <Send className="h-4 w-4" />
            </button>
          </form>
          <AIDisclaimer className="mt-3" />
        </div>
      </Card>
    </div>
  );
}

function Message({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-start gap-3 animate-fade-in-fast ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${
          isUser ? 'bg-ink-700' : 'bg-gradient-to-br from-brand-500 to-brand-700'
        }`}
      >
        {isUser ? (
          <span className="text-xs font-bold">AK</span>
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-brand-600 text-white rounded-tr-sm'
            : 'bg-ink-50 text-ink-800 rounded-tl-sm'
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}
