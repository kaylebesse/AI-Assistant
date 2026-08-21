// AI Engine — structured prompt templates + deterministic generation
// Each feature builds a structured prompt, then produces professional, structured output.

export type EmailTone = 'professional' | 'friendly' | 'persuasive' | 'apologetic' | 'assertive';
export type EmailAudience = 'client' | 'manager' | 'team' | 'vendor' | 'customer';

export interface EmailInput {
  purpose: string;
  tone: EmailTone;
  audience: EmailAudience;
  keyPoints: string;
  senderName: string;
  senderRole: string;
  callToAction: string;
}

export interface MeetingInput {
  notes: string;
  meetingTitle: string;
  participants: string;
  date: string;
}

export interface TaskPlannerInput {
  rawTasks: string;
  workHours: string;
  deadlines: string;
  priorities: string;
}

export interface ResearchInput {
  topic: string;
  focus: string;
  depth: 'brief' | 'standard' | 'detailed';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  ts: number;
}

// ---------- Prompt builders (structured prompt engineering) ----------

export function buildEmailPrompt(i: EmailInput): string {
  return [
    `ROLE: You are an expert workplace communications assistant.`,
    `TASK: Draft a polished, ready-to-send email.`,
    `CONSTRAINTS:`,
    `- Purpose: ${i.purpose}`,
    `- Tone: ${i.tone}`,
    `- Audience: ${i.audience}`,
    `- Key points to include: ${i.keyPoints}`,
    `- Sender: ${i.senderName} (${i.senderRole})`,
    `- Call to action: ${i.callToAction}`,
    `- Keep it concise (120–180 words), clear subject line, professional greeting and sign-off.`,
    `OUTPUT FORMAT: Subject line on the first line, blank line, then the email body.`,
  ].join('\n');
}

export function buildMeetingPrompt(i: MeetingInput): string {
  return [
    `ROLE: You are an expert meeting notes analyst.`,
    `TASK: Summarize raw meeting notes into a structured brief.`,
    `CONSTRAINTS:`,
    `- Meeting: ${i.meetingTitle}`,
    `- Participants: ${i.participants}`,
    `- Date: ${i.date}`,
    `- Raw notes: ${i.notes}`,
    `OUTPUT FORMAT (strict):`,
    `1. "Summary" — 2–3 sentence overview.`,
    `2. "Key Points" — bullet list of the most important takeaways.`,
    `3. "Action Items" — bullet list with owner (if known) and action.`,
    `4. "Deadlines" — bullet list of any dates mentioned, or "None noted".`,
    `5. "Open Questions" — bullet list of unresolved items, or "None noted".`,
  ].join('\n');
}

export function buildTaskPlannerPrompt(i: TaskPlannerInput): string {
  return [
    `ROLE: You are an expert productivity planner.`,
    `TASK: Convert a raw task list into a prioritized, scheduled plan.`,
    `CONSTRAINTS:`,
    `- Raw tasks: ${i.rawTasks}`,
    `- Available work hours: ${i.workHours}`,
    `- Deadlines: ${i.deadlines}`,
    `- Priority notes: ${i.priorities}`,
    `METHOD: Apply Eisenhower-style urgency/importance ranking, then schedule within the work hours.`,
    `OUTPUT FORMAT (strict):`,
    `1. "Today's Plan" — time-blocked schedule (e.g., "09:00–09:45 — Task").`,
    `2. "Priority Queue" — numbered list, each with Priority (High/Med/Low) and rationale.`,
    `3. "Defer / Delegate" — tasks that should be moved out or handed off.`,
    `4. "Notes" — 1–2 tips for focus or risk.`,
  ].join('\n');
}

export function buildResearchPrompt(i: ResearchInput): string {
  return [
    `ROLE: You are an expert research analyst.`,
    `TASK: Produce a ${i.depth} research brief on a topic.`,
    `CONSTRAINTS:`,
    `- Topic: ${i.topic}`,
    `- Focus: ${i.focus}`,
    `- Depth: ${i.depth}`,
    `OUTPUT FORMAT (strict):`,
    `1. "Overview" — 2–3 sentence framing.`,
    `2. "Key Insights" — 3–5 bullet points.`,
    `3. "Considerations" — risks, caveats, or trade-offs.`,
    `4. "Recommended Next Steps" — 2–3 actionable suggestions.`,
    `Keep claims grounded and avoid fabrication; flag uncertainty.`,
  ].join('\n');
}

export function buildChatPrompt(history: ChatMessage[]): string {
  const transcript = history
    .slice(-8)
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');
  return [
    `ROLE: You are FlowAI, a helpful workplace productivity assistant.`,
    `Be concise, practical, and professional. If asked something outside workplace productivity, gently steer back or answer briefly.`,
    `CONVERSATION:`,
    transcript,
    `Respond as the assistant in 2–4 sentences unless the user asks for detail.`,
  ].join('\n');
}

// ---------- Deterministic generation ----------

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function lines(seed: number, count: number): number[] {
  return Array.from({ length: count }, (_, k) => (seed + k * 7919) >>> 0);
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

function splitPoints(text: string): string[] {
  return text
    .split(/[\n,;•]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1)
    .slice(0, 6);
}

// ---------- Email ----------

const emailSubjects: Record<EmailTone, string[]> = {
  professional: ['Regarding {purpose}', 'Action Required: {purpose}', 'Update — {purpose}'],
  friendly: ['Quick note: {purpose}', 'Checking in on {purpose}', 'Heads up: {purpose}'],
  persuasive: ['Proposal: {purpose}', 'An opportunity regarding {purpose}', 'Why {purpose} matters now'],
  apologetic: ['Our apologies regarding {purpose}', 'Correction: {purpose}', 'Making things right — {purpose}'],
  assertive: ['Action needed: {purpose}', 'Deadline: {purpose}', 'Important — {purpose}'],
};

const emailGreetings: Record<EmailAudience, string[]> = {
  client: ['Dear {name},', 'Hello {name},'],
  manager: ['Hi {name},', 'Dear {name},'],
  team: ['Hi team,', 'Hi everyone,'],
  vendor: ['Hello {name},', 'Dear {name},'],
  customer: ['Hi {name},', 'Dear {name},'],
};

export function generateEmail(i: EmailInput): string {
  const seed = hash(JSON.stringify(i));
  const purpose = i.purpose.trim() || 'our project';
  const subject = pick(emailSubjects[i.tone], seed).replace('{purpose}', titleCase(purpose));
  const greet = pick(emailGreetings[i.audience], seed >> 3).replace(
    '{name}',
    i.audience === 'team' ? 'team' : 'there'
  );

  const points = splitPoints(i.keyPoints).length
    ? splitPoints(i.keyPoints)
    : ['the key objective', 'the current status', 'the next step'];

  const body = [
    greet,
    '',
    `I'm writing about ${purpose}.`,
    '',
    ...points.slice(0, 3).map((p) => `• ${p.trim()}`),
    '',
    i.callToAction.trim() || 'Please let me know if you have any questions.',
    '',
    'Thank you,',
    `${i.senderName || 'Your name'}${i.senderRole ? ` — ${i.senderRole}` : ''}`,
  ].join('\n');

  return `${subject}\n\n${body}`;
}

// ---------- Meeting ----------

export interface MeetingResult {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  deadlines: string[];
  openQuestions: string[];
}

export function summarizeMeeting(i: MeetingInput): MeetingResult {
  const seed = hash(i.notes + i.meetingTitle);
  const notes = i.notes.trim();
  const rawPoints = splitPoints(notes);

  const keyPoints =
    rawPoints.length > 0
      ? rawPoints.slice(0, 5).map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      : [
          'Project status reviewed and on track.',
          'Budget allocation confirmed for next phase.',
          'Stakeholder feedback incorporated into roadmap.',
        ];

  const actionVerbs = ['Finalize', 'Review', 'Draft', 'Coordinate', 'Prepare', 'Share', 'Follow up on'];
  const actionItems = keyPoints.slice(0, 3).map((p, idx) => {
    const verb = pick(actionVerbs, seed + idx);
    const owner = i.participants
      ? pick(i.participants.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean), seed + idx * 31)
      : 'Unassigned';
    return `${verb} ${p.toLowerCase().replace(/\.$/, '')} — Owner: ${owner}`;
  });

  const deadlineMatches = notes.match(/\b(?:by|before|due)\s+([A-Za-z0-9 ,/-]+)/g) || [];
  const deadlines =
    deadlineMatches.length > 0
      ? deadlineMatches.slice(0, 4)
      : ['None noted'];

  const openQuestions = [
    'Resource allocation for Q3 needs confirmation.',
    'Vendor contract renewal pending legal review.',
    'Customer feedback loop to be defined.',
  ].filter((_, idx) => (seed >> idx) & 1);
  if (openQuestions.length === 0) openQuestions.push('None noted');

  const summary = `${i.meetingTitle || 'Meeting'} covered ${keyPoints.length} key topics. Participants aligned on next steps, with ${actionItems.length} action items assigned. Overall status: on track with minor follow-ups required.`;

  return { summary, keyPoints, actionItems, deadlines, openQuestions };
}

// ---------- Task Planner ----------

export interface PlannedTask {
  time: string;
  title: string;
  priority: 'High' | 'Med' | 'Low';
}
export interface TaskPlan {
  schedule: PlannedTask[];
  priorityQueue: { n: number; title: string; priority: 'High' | 'Med' | 'Low'; rationale: string }[];
  deferDelegate: string[];
  notes: string[];
}

export function planTasks(i: TaskPlannerInput): TaskPlan {
  const seed = hash(i.rawTasks + i.workHours);
  const tasks = splitPoints(i.rawTasks);
  const base =
    tasks.length > 0
      ? tasks
      : ['Prepare quarterly report', 'Review team OKRs', 'Client follow-up call', 'Inbox triage'];

  const startHour = 9;
  const schedule: PlannedTask[] = base.slice(0, 6).map((t, idx) => {
    const start = startHour + idx;
    const end = start + 1;
    const prio: PlannedTask['priority'] = idx === 0 ? 'High' : idx < 3 ? 'Med' : 'Low';
    return {
      time: `${String(start).padStart(2, '0')}:00–${String(end).padStart(2, '0')}:00`,
      title: t.charAt(0).toUpperCase() + t.slice(1),
      priority: prio,
    };
  });

  const rationales = [
    'Directly tied to a deadline this week.',
    'Unblocks other team members.',
    'High impact, low effort.',
    'Important but not urgent.',
    'Routine maintenance.',
  ];

  const priorityQueue = base.slice(0, 5).map((t, idx) => ({
    n: idx + 1,
    title: t.charAt(0).toUpperCase() + t.slice(1),
    priority: (idx === 0 ? 'High' : idx < 3 ? 'Med' : 'Low') as PlannedTask['priority'],
    rationale: pick(rationales, seed + idx),
  }));

  const deferDelegate =
    base.length > 5
      ? base.slice(5).map((t) => `Delegate: ${t}`)
      : ['Delegate: Inbox triage to assistant', 'Defer: Non-urgent reading to Friday afternoon'];

  const notes = [
    'Protect the first 90 minutes for deep work on the top-priority task.',
    i.deadlines.trim() ? `Watch deadlines: ${i.deadlines.trim()}.` : 'No hard deadlines noted — pace by energy.',
  ];

  return { schedule, priorityQueue, deferDelegate, notes };
}

// ---------- Research ----------

export interface ResearchResult {
  overview: string;
  keyInsights: string[];
  considerations: string[];
  nextSteps: string[];
}

export function researchTopic(i: ResearchInput): ResearchResult {
  const seed = hash(i.topic + i.focus + i.depth);
  const topic = i.topic.trim() || 'the topic';
  const focus = i.focus.trim() || 'general overview';

  const insightPool = [
    `Adoption of ${topic} is accelerating in mid-market organizations.`,
    `Cost efficiency improves measurably within 6–9 months of implementation.`,
    `Integration with existing tooling is the most common implementation hurdle.`,
    `Teams that document workflows first see 2x better outcomes.`,
    `Regulatory considerations vary significantly by region.`,
    `Pilot programs reduce risk and build internal buy-in.`,
    `Skills gaps remain the top barrier to scale.`,
  ];

  const insightCount = i.depth === 'brief' ? 3 : i.depth === 'detailed' ? 5 : 4;
  const keyInsights = lines(seed, insightCount).map((s, idx) => pick(insightPool, s + idx));

  const considerations = [
    `Results can vary based on organizational context — validate with a pilot.`,
    `Watch for hidden costs in training and change management.`,
    `Data privacy and compliance requirements must be reviewed.`,
  ].filter((_, idx) => i.depth !== 'brief' || idx < 2);

  const nextSteps = [
    `Run a 2-week pilot focused on ${focus}.`,
    `Document current workflows to establish a baseline.`,
    `Identify 1–2 champions to drive adoption.`,
  ];

  const overview = `${titleCase(topic)} is increasingly relevant for teams focused on ${focus}. This brief synthesizes the most actionable insights and flags key considerations for decision-making.`;

  return { overview, keyInsights, considerations, nextSteps };
}

// ---------- Chatbot ----------

const chatReplies = [
  (q: string) => `Here's a practical take on "${q.slice(0, 60)}": break it into three steps, tackle the highest-impact one first, and timebox the rest. Want me to draft a quick plan?`,
  (q: string) => `Good question. For "${q.slice(0, 60)}", I'd recommend starting with a clear goal, then outlining the smallest viable next step. I can turn that into a task list if you'd like.`,
  (q: string) => `I can help with that. "${q.slice(0, 60)}" is best approached by clarifying the outcome you want, then working backward. Shall I generate a starter email or summary?`,
  () => `Absolutely — I'm built for workplace productivity. I can draft emails, summarize meetings, plan your tasks, or research a topic. Which would you like to start with?`,
  (q: string) => `Let's keep it actionable. For "${q.slice(0, 60)}", the fastest win is usually to define done, list the blockers, and pick one to remove today. Want me to structure this?`,
];

export function chatReply(history: ChatMessage[]): string {
  const last = [...history].reverse().find((m) => m.role === 'user');
  const q = last ? last.content : 'Hello';
  const seed = hash(q + history.length);
  return pick(chatReplies, seed)(q);
}

// ---------- Async wrappers (simulate latency + streaming feel) ----------

export function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function runWithDelay<T>(fn: () => T, ms = 1100): Promise<T> {
  await delay(ms);
  return fn();
}
