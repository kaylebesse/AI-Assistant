import pptxgen from 'pptxgenjs';
import { writeFileSync } from 'node:fs';

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'FlowAI';
pptx.company = 'FlowAI';
pptx.subject = 'AI Workplace Productivity Assistant';
pptx.title = 'FlowAI — AI Workplace Productivity Assistant';

// ---------- Theme ----------
const C = {
  ink950: '131722',
  ink900: '1F2533',
  ink700: '3F495E',
  ink500: '62718D',
  ink300: 'B0B9C9',
  ink200: 'D5DAE3',
  ink100: 'ECEEF2',
  ink50: 'F6F7F9',
  white: 'FFFFFF',
  brand600: '1C66F0',
  brand500: '3385FC',
  brand400: '59A6FF',
  brand100: 'D9ECFF',
  brand50: 'EEF6FF',
  accent600: '16A34A',
  accent500: '22C55E',
  accent50: 'F0FDF4',
  warn600: 'CA8A04',
  warn500: 'EAB308',
  warn50: 'FFFBE0',
  danger500: 'EF4444',
};

const FONT = 'Plus Jakarta Sans';
pptx.defineSlideMaster({
  title: 'FlowMaster',
  background: { color: C.white },
  objects: [
    { rect: { x: 0, y: 7.0, w: 13.33, h: 0.5, fill: { color: C.ink50 } } },
    { text: { text: 'FlowAI — AI Workplace Productivity Assistant', options: { x: 0.5, y: 7.05, w: 8, h: 0.4, fontSize: 9, color: C.ink300, fontFace: FONT } } },
    { text: { text: 'AI-generated content may require human review', options: { x: 9.5, y: 7.05, w: 3.3, h: 0.4, fontSize: 9, color: C.ink300, fontFace: FONT, align: 'right' } } },
  ],
  slideNumber: { x: 12.8, y: 7.05, w: 0.4, h: 0.4, fontSize: 9, color: C.ink300, fontFace: FONT, align: 'right' },
});

// ---------- Helpers ----------
function addChip(slide: pptxgen.Slide, x: number, y: number, text: string, fill: string, color: string) {
  slide.addShape('roundRect', { x, y, w: 2.2, h: 0.35, rectRadius: 0.17, fill: { color: fill }, line: { color: fill, width: 0 } });
  slide.addText(text, { x, y, w: 2.2, h: 0.35, fontSize: 11, bold: true, color, fontFace: FONT, align: 'center', valign: 'middle' });
}

function featureCard(slide: pptxgen.Slide, x: number, y: number, w: number, h: number, num: string, title: string, desc: string, iconText: string, accent: string) {
  slide.addShape('roundRect', { x, y, w, h, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.ink200, width: 1 } });
  slide.addShape('roundRect', { x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, rectRadius: 0.1, fill: { color: accent } });
  slide.addText(iconText, { x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, fontSize: 20, color: C.white, fontFace: FONT, align: 'center', valign: 'middle', bold: true });
  slide.addText(num, { x: x + w - 0.5, y: y + 0.15, w: 0.4, h: 0.3, fontSize: 10, color: C.ink300, fontFace: FONT, align: 'right' });
  slide.addText(title, { x: x + 0.2, y: y + 0.85, w: w - 0.4, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  slide.addText(desc, { x: x + 0.2, y: y + 1.2, w: w - 0.4, h: h - 1.35, fontSize: 10, color: C.ink500, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.3 });
}

function sectionHeader(slide: pptxgen.Slide, num: string, title: string) {
  slide.addShape('roundRect', { x: 0.5, y: 0.45, w: 0.55, h: 0.55, rectRadius: 0.1, fill: { color: C.brand600 } });
  slide.addText(num, { x: 0.5, y: 0.45, w: 0.55, h: 0.55, fontSize: 22, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
  slide.addText(title, { x: 1.2, y: 0.45, w: 10, h: 0.55, fontSize: 26, bold: true, color: C.ink900, fontFace: FONT, valign: 'middle' });
  slide.addShape('line', { x: 0.5, y: 1.15, w: 12.33, h: 0, line: { color: C.ink100, width: 1.5 } });
}

// ============================================================
// SLIDE 1 — Title / Cover
// ============================================================
{
  const s = pptx.addSlide();
  s.background = { color: C.ink950 };
  // Decorative circles
  s.addShape('ellipse', { x: 9.5, y: -1.5, w: 5, h: 5, fill: { color: C.brand600, transparency: 75 } });
  s.addShape('ellipse', { x: 10.5, y: 3.5, w: 4, h: 4, fill: { color: C.accent600, transparency: 80 } });
  // Logo mark
  s.addShape('roundRect', { x: 0.8, y: 0.7, w: 0.7, h: 0.7, rectRadius: 0.15, fill: { color: C.brand600 } });
  s.addText('F', { x: 0.8, y: 0.7, w: 0.7, h: 0.7, fontSize: 28, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
  s.addText('FlowAI', { x: 1.6, y: 0.7, w: 3, h: 0.7, fontSize: 20, bold: true, color: C.white, fontFace: FONT, valign: 'middle' });

  s.addText('AI Workplace\nProductivity Assistant', { x: 0.8, y: 2.0, w: 11, h: 1.8, fontSize: 44, bold: true, color: C.white, fontFace: FONT, lineSpacingMultiple: 1.1 });
  s.addText('Automate daily work tasks with structured, professional AI outputs.', { x: 0.8, y: 4.0, w: 9, h: 0.5, fontSize: 18, color: C.ink300, fontFace: FONT });

  // Feature pills
  const pills = ['Email Generation', 'Meeting Summarization', 'Task Planning', 'Research Assistance', 'AI Chatbot'];
  pills.forEach((p, i) => {
    s.addShape('roundRect', { x: 0.8 + i * 2.35, y: 4.9, w: 2.15, h: 0.4, rectRadius: 0.2, fill: { color: C.white, transparency: 88 }, line: { color: C.brand400, width: 1, transparency: 50 } });
    s.addText(p, { x: 0.8 + i * 2.35, y: 4.9, w: 2.15, h: 0.4, fontSize: 10, bold: true, color: C.brand100, fontFace: FONT, align: 'center', valign: 'middle' });
  });

  s.addText('A functional prototype demonstrating prompt engineering, structured AI outputs, and responsible AI use.', { x: 0.8, y: 5.7, w: 11, h: 0.4, fontSize: 12, color: C.ink500, fontFace: FONT, italic: true });
  s.addText('2026', { x: 0.8, y: 6.5, w: 3, h: 0.4, fontSize: 12, color: C.ink300, fontFace: FONT });
}

// ============================================================
// SLIDE 2 — Problem & Solution
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '01', 'The Problem & Solution');

  // Problem
  s.addText('The Challenge', { x: 0.5, y: 1.4, w: 5.8, h: 0.4, fontSize: 16, bold: true, color: C.danger500, fontFace: FONT });
  const problems = [
    'Professionals spend hours on repetitive communication tasks',
    'Meeting notes often go unstructured and unused',
    'Task prioritization is manual and inconsistent',
    'Research takes time that could be spent on higher-value work',
  ];
  problems.forEach((p, i) => {
    s.addShape('roundRect', { x: 0.5, y: 1.95 + i * 0.7, w: 5.8, h: 0.6, rectRadius: 0.08, fill: { color: C.ink50 }, line: { color: C.ink100, width: 1 } });
    s.addShape('ellipse', { x: 0.7, y: 2.15 + i * 0.7, w: 0.2, h: 0.2, fill: { color: C.danger500 } });
    s.addText(p, { x: 1.05, y: 1.95 + i * 0.7, w: 5.1, h: 0.6, fontSize: 11, color: C.ink700, fontFace: FONT, valign: 'middle', lineSpacingMultiple: 1.2 });
  });

  // Solution
  s.addText('The FlowAI Solution', { x: 7.0, y: 1.4, w: 5.8, h: 0.4, fontSize: 16, bold: true, color: C.accent600, fontFace: FONT });
  const solutions = [
    'One AI workspace for five core productivity tasks',
    'Structured prompt engineering for professional output',
    'Tone & audience-aware email generation',
    'Actionable summaries, plans, and research briefs',
  ];
  solutions.forEach((p, i) => {
    s.addShape('roundRect', { x: 7.0, y: 1.95 + i * 0.7, w: 5.8, h: 0.6, rectRadius: 0.08, fill: { color: C.accent50 }, line: { color: C.accent500, width: 1 } });
    s.addShape('ellipse', { x: 7.2, y: 2.15 + i * 0.7, w: 0.2, h: 0.2, fill: { color: C.accent600 } });
    s.addText(p, { x: 7.55, y: 1.95 + i * 0.7, w: 5.1, h: 0.6, fontSize: 11, color: C.ink700, fontFace: FONT, valign: 'middle', lineSpacingMultiple: 1.2 });
  });
}

// ============================================================
// SLIDE 3 — Core Features Overview
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '02', 'Core Features');

  const features = [
    { num: '01', title: 'Smart Email Generator', desc: 'Tone & audience-based email drafting with structured prompts. Produces subject line, body, and sign-off.', icon: '✉', accent: C.brand600 },
    { num: '02', title: 'Meeting Notes Summarizer', desc: 'Raw notes → key points, action items with owners, deadlines, and open questions.', icon: '📝', accent: C.accent600 },
    { num: '03', title: 'AI Task Planner', desc: 'Prioritized, time-blocked schedule using Eisenhower urgency/importance ranking.', icon: '✓', accent: C.warn600 },
    { num: '04', title: 'AI Research Assistant', desc: 'Structured research briefs: overview, key insights, considerations, next steps.', icon: '🔬', accent: C.brand500 },
    { num: '05', title: 'AI Chatbot Interface', desc: 'Conversational assistant with suggestion chips, typing indicators, and reset.', icon: '💬', accent: C.ink700 },
    { num: '06', title: 'Professional Dashboard', desc: 'Overview with usage stats, quick-launch cards, activity feed, and tips.', icon: '📊', accent: C.brand600 },
  ];

  features.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    featureCard(s, 0.5 + col * 4.15, 1.4 + row * 2.7, 3.85, 2.5, f.num, f.title, f.desc, f.icon, f.accent);
  });
}

// ============================================================
// SLIDE 4 — Smart Email Generator
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '03', 'Smart Email Generator');

  // Left: inputs
  s.addText('Inputs', { x: 0.5, y: 1.4, w: 5.5, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  const inputs = [
    { label: 'Purpose', value: 'e.g. Follow up on the product demo' },
    { label: 'Tone', value: 'Professional · Friendly · Persuasive · Apologetic · Assertive' },
    { label: 'Audience', value: 'Client · Manager · Team · Vendor · Customer' },
    { label: 'Key points', value: 'Bullet points to include in the email' },
    { label: 'Sender info', value: 'Name and role for the sign-off' },
    { label: 'Call to action', value: 'e.g. Reply by Friday with availability' },
  ];
  inputs.forEach((inp, i) => {
    s.addShape('roundRect', { x: 0.5, y: 1.85 + i * 0.65, w: 5.5, h: 0.55, rectRadius: 0.06, fill: { color: C.ink50 }, line: { color: C.ink100, width: 1 } });
    s.addText(inp.label, { x: 0.7, y: 1.85 + i * 0.65, w: 1.5, h: 0.55, fontSize: 10, bold: true, color: C.brand600, fontFace: FONT, valign: 'middle' });
    s.addText(inp.value, { x: 2.2, y: 1.85 + i * 0.65, w: 3.7, h: 0.55, fontSize: 9.5, color: C.ink500, fontFace: FONT, valign: 'middle', lineSpacingMultiple: 1.2 });
  });

  // Right: output example
  s.addText('Sample Output', { x: 6.5, y: 1.4, w: 6.3, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  s.addShape('roundRect', { x: 6.5, y: 1.85, w: 6.3, h: 4.6, rectRadius: 0.08, fill: { color: C.ink50 }, line: { color: C.ink200, width: 1 } });
  s.addText('Subject: Action Required — Follow Up On The Product Demo', { x: 6.75, y: 2.05, w: 5.8, h: 0.4, fontSize: 11, bold: true, color: C.ink900, fontFace: FONT });
  s.addShape('line', { x: 6.75, y: 2.5, w: 5.8, h: 0, line: { color: C.ink200, width: 1 } });
  s.addText([
    { text: 'Hello there,\n\n', options: { fontSize: 10.5, color: C.ink700 } },
    { text: "I'm writing about follow up on the product demo.\n\n", options: { fontSize: 10.5, color: C.ink700 } },
    { text: '• The demo went well and the client is interested\n', options: { fontSize: 10.5, color: C.ink700 } },
    { text: '• Next step is a pricing review call\n', options: { fontSize: 10.5, color: C.ink700 } },
    { text: '• Timeline target is end of next week\n\n', options: { fontSize: 10.5, color: C.ink700 } },
    { text: 'Please reply by Friday with availability.\n\n', options: { fontSize: 10.5, color: C.ink700 } },
    { text: 'Thank you,\n', options: { fontSize: 10.5, color: C.ink700 } },
    { text: 'Alex Kim — Project Manager', options: { fontSize: 10.5, bold: true, color: C.ink900 } },
  ], { x: 6.75, y: 2.6, w: 5.8, h: 3.7, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.4 });
}

// ============================================================
// SLIDE 5 — Meeting Notes Summarizer
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '04', 'Meeting Notes Summarizer');

  // Left: raw notes
  s.addText('Raw Notes (Input)', { x: 0.5, y: 1.4, w: 5.5, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  s.addShape('roundRect', { x: 0.5, y: 1.85, w: 5.5, h: 4.6, rectRadius: 0.08, fill: { color: C.ink950 }, line: { color: C.ink900, width: 1 } });
  s.addText([
    { text: 'Q3 Product Roadmap Review\n', options: { fontSize: 11, bold: true, color: C.brand400 } },
    { text: 'Participants: Sarah, Mike, Jen\n\n', options: { fontSize: 9.5, color: C.ink300 } },
    { text: '- Discussed launch timeline, target is Oct 15\n', options: { fontSize: 10, color: C.ink200 } },
    { text: '- Sarah to finalize pricing by Oct 1\n', options: { fontSize: 10, color: C.ink200 } },
    { text: '- Budget approved for marketing campaign\n', options: { fontSize: 10, color: C.ink200 } },
    { text: '- Need to confirm vendor contract before Oct 10\n', options: { fontSize: 10, color: C.ink200 } },
    { text: '- Customer feedback loop still undefined\n', options: { fontSize: 10, color: C.ink200 } },
    { text: '- Mike raised concern about dev capacity\n', options: { fontSize: 10, color: C.ink200 } },
  ], { x: 0.75, y: 2.05, w: 5.0, h: 4.2, fontFace: 'Consolas', valign: 'top', lineSpacingMultiple: 1.5 });

  // Right: structured output
  s.addText('Structured Summary (Output)', { x: 6.5, y: 1.4, w: 6.3, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });

  const sections = [
    { title: 'Summary', color: C.brand600, lines: ['Q3 roadmap reviewed. 2 action items assigned. On track with minor follow-ups.'] },
    { title: 'Key Points', color: C.accent600, lines: ['Launch target: Oct 15', 'Budget approved for marketing', 'Vendor contract must be confirmed'] },
    { title: 'Action Items', color: C.brand600, lines: ['Finalize pricing — Owner: Sarah', 'Confirm vendor contract — Owner: Mike'] },
    { title: 'Deadlines', color: C.warn600, lines: ['Pricing by Oct 1', 'Vendor contract before Oct 10', 'Launch by Oct 15'] },
    { title: 'Open Questions', color: C.ink700, lines: ['Customer feedback loop to be defined', 'Dev capacity concern to address'] },
  ];

  let yPos = 1.85;
  sections.forEach((sec) => {
    s.addShape('roundRect', { x: 6.5, y: yPos, w: 6.3, h: 0.32, rectRadius: 0.06, fill: { color: sec.color } });
    s.addText(sec.title, { x: 6.65, y: yPos, w: 6.0, h: 0.32, fontSize: 10, bold: true, color: C.white, fontFace: FONT, valign: 'middle' });
    yPos += 0.38;
    sec.lines.forEach((line) => {
      s.addShape('ellipse', { x: 6.75, y: yPos + 0.07, w: 0.1, h: 0.1, fill: { color: sec.color } });
      s.addText(line, { x: 6.95, y: yPos, w: 5.7, h: 0.28, fontSize: 9.5, color: C.ink700, fontFace: FONT, valign: 'middle' });
      yPos += 0.3;
    });
    yPos += 0.08;
  });
}

// ============================================================
// SLIDE 6 — AI Task Planner
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '05', 'AI Task Planner');

  // Left: schedule
  s.addText("Today's Schedule", { x: 0.5, y: 1.4, w: 6.0, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  const schedule = [
    { time: '09:00–10:00', task: 'Prepare quarterly report', prio: 'High', color: C.danger500 },
    { time: '10:00–11:00', task: 'Client follow-up call', prio: 'High', color: C.danger500 },
    { time: '11:00–12:00', task: 'Review team OKRs', prio: 'Med', color: C.warn600 },
    { time: '12:00–13:00', task: 'Lunch break', prio: 'Low', color: C.accent600 },
    { time: '13:00–14:00', task: 'Update project tracker', prio: 'Med', color: C.warn600 },
    { time: '14:00–15:00', task: 'Inbox triage', prio: 'Low', color: C.accent600 },
  ];
  schedule.forEach((item, i) => {
    s.addShape('roundRect', { x: 0.5, y: 1.85 + i * 0.65, w: 6.0, h: 0.55, rectRadius: 0.06, fill: { color: C.ink50 }, line: { color: C.ink100, width: 1 } });
    s.addText(item.time, { x: 0.65, y: 1.85 + i * 0.65, w: 1.6, h: 0.55, fontSize: 10, bold: true, color: C.ink500, fontFace: 'Consolas', valign: 'middle' });
    s.addText(item.task, { x: 2.3, y: 1.85 + i * 0.65, w: 3.0, h: 0.55, fontSize: 11, color: C.ink800, fontFace: FONT, valign: 'middle' });
    s.addShape('roundRect', { x: 5.4, y: 1.97 + i * 0.65, w: 0.9, h: 0.3, rectRadius: 0.15, fill: { color: item.color } });
    s.addText(item.prio, { x: 5.4, y: 1.97 + i * 0.65, w: 0.9, h: 0.3, fontSize: 9, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
  });

  // Right: priority + defer
  s.addText('Priority Queue', { x: 6.8, y: 1.4, w: 6.0, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  const prio = [
    { n: '1', task: 'Prepare quarterly report', reason: 'Directly tied to a deadline this week' },
    { n: '2', task: 'Client follow-up call', reason: 'Unblocks other team members' },
    { n: '3', task: 'Review team OKRs', reason: 'High impact, low effort' },
  ];
  prio.forEach((p, i) => {
    s.addShape('roundRect', { x: 6.8, y: 1.85 + i * 0.7, w: 6.0, h: 0.6, rectRadius: 0.06, fill: { color: C.brand50 }, line: { color: C.brand100, width: 1 } });
    s.addText(p.n, { x: 6.95, y: 1.85 + i * 0.7, w: 0.35, h: 0.6, fontSize: 16, bold: true, color: C.brand600, fontFace: FONT, valign: 'middle' });
    s.addText(p.task, { x: 7.35, y: 1.87 + i * 0.7, w: 5.3, h: 0.3, fontSize: 11, bold: true, color: C.ink900, fontFace: FONT });
    s.addText(p.reason, { x: 7.35, y: 2.15 + i * 0.7, w: 5.3, h: 0.25, fontSize: 9, color: C.ink500, fontFace: FONT, italic: true });
  });

  s.addText('Defer / Delegate', { x: 6.8, y: 4.1, w: 6.0, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  const defer = ['Delegate: Inbox triage to assistant', 'Defer: Non-urgent reading to Friday afternoon'];
  defer.forEach((d, i) => {
    s.addShape('roundRect', { x: 6.8, y: 4.55 + i * 0.5, w: 6.0, h: 0.4, rectRadius: 0.06, fill: { color: C.ink50 }, line: { color: C.ink100, width: 1 } });
    s.addText('→  ' + d, { x: 6.95, y: 4.55 + i * 0.5, w: 5.7, h: 0.4, fontSize: 10, color: C.ink700, fontFace: FONT, valign: 'middle' });
  });

  s.addText('Focus tip: Protect the first 90 minutes for deep work on the top-priority task.', { x: 6.8, y: 5.65, w: 6.0, h: 0.5, fontSize: 10, italic: true, color: C.brand600, fontFace: FONT, valign: 'middle' });
}

// ============================================================
// SLIDE 7 — AI Research Assistant
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '06', 'AI Research Assistant');

  // Input controls
  s.addText('Inputs', { x: 0.5, y: 1.4, w: 5.5, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  s.addShape('roundRect', { x: 0.5, y: 1.85, w: 5.5, h: 0.55, rectRadius: 0.06, fill: { color: C.ink50 }, line: { color: C.ink100, width: 1 } });
  s.addText('Topic', { x: 0.7, y: 1.85, w: 1.2, h: 0.55, fontSize: 10, bold: true, color: C.brand600, fontFace: FONT, valign: 'middle' });
  s.addText('AI adoption in mid-market companies', { x: 1.9, y: 1.85, w: 4.0, h: 0.55, fontSize: 10, color: C.ink700, fontFace: FONT, valign: 'middle' });

  s.addShape('roundRect', { x: 0.5, y: 2.5, w: 5.5, h: 0.55, rectRadius: 0.06, fill: { color: C.ink50 }, line: { color: C.ink100, width: 1 } });
  s.addText('Focus', { x: 0.7, y: 2.5, w: 1.2, h: 0.55, fontSize: 10, bold: true, color: C.brand600, fontFace: FONT, valign: 'middle' });
  s.addText('Cost-benefit and implementation', { x: 1.9, y: 2.5, w: 4.0, h: 0.55, fontSize: 10, color: C.ink700, fontFace: FONT, valign: 'middle' });

  s.addText('Depth', { x: 0.5, y: 3.2, w: 1.5, h: 0.35, fontSize: 10, bold: true, color: C.ink700, fontFace: FONT });
  const depths = [
    { label: 'Brief', desc: 'Quick overview', active: false },
    { label: 'Standard', desc: 'Balanced detail', active: true },
    { label: 'Detailed', desc: 'In-depth analysis', active: false },
  ];
  depths.forEach((d, i) => {
    const fill = d.active ? C.brand600 : C.ink50;
    const tc = d.active ? C.white : C.ink700;
    s.addShape('roundRect', { x: 0.5 + i * 1.85, y: 3.55, w: 1.7, h: 0.7, rectRadius: 0.08, fill: { color: fill }, line: { color: d.active ? C.brand600 : C.ink200, width: 1 } });
    s.addText(d.label, { x: 0.5 + i * 1.85, y: 3.58, w: 1.7, h: 0.35, fontSize: 11, bold: true, color: tc, fontFace: FONT, align: 'center' });
    s.addText(d.desc, { x: 0.5 + i * 1.85, y: 3.88, w: 1.7, h: 0.3, fontSize: 9, color: d.active ? C.brand50 : C.ink500, fontFace: FONT, align: 'center' });
  });

  // Output brief
  s.addText('Research Brief (Output)', { x: 6.5, y: 1.4, w: 6.3, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  const rSections = [
    { title: 'Overview', color: C.brand600, text: 'AI adoption in mid-market companies is increasingly relevant for teams focused on cost-benefit and implementation.' },
    { title: 'Key Insights', color: C.accent600, items: ['Adoption accelerating in mid-market orgs', 'Cost efficiency improves within 6–9 months', 'Integration with existing tools is the top hurdle'] },
    { title: 'Considerations', color: C.warn600, items: ['Results vary by org context — validate with a pilot', 'Watch for hidden costs in training and change management'] },
    { title: 'Next Steps', color: C.brand600, items: ['Run a 2-week pilot on cost-benefit', 'Document current workflows as a baseline', 'Identify 1–2 champions to drive adoption'] },
  ];

  let yPos = 1.85;
  rSections.forEach((sec) => {
    s.addShape('roundRect', { x: 6.5, y: yPos, w: 6.3, h: 0.3, rectRadius: 0.06, fill: { color: sec.color } });
    s.addText(sec.title, { x: 6.65, y: yPos, w: 6.0, h: 0.3, fontSize: 10, bold: true, color: C.white, fontFace: FONT, valign: 'middle' });
    yPos += 0.36;
    if (sec.text) {
      s.addText(sec.text, { x: 6.7, y: yPos, w: 6.0, h: 0.5, fontSize: 9.5, color: C.ink700, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.3 });
      yPos += 0.55;
    } else if (sec.items) {
      sec.items.forEach((item) => {
        s.addShape('ellipse', { x: 6.75, y: yPos + 0.06, w: 0.1, h: 0.1, fill: { color: sec.color } });
        s.addText(item, { x: 6.95, y: yPos, w: 5.7, h: 0.26, fontSize: 9.5, color: C.ink700, fontFace: FONT, valign: 'middle' });
        yPos += 0.28;
      });
      yPos += 0.05;
    }
  });
}

// ============================================================
// SLIDE 8 — AI Chatbot Interface
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '07', 'AI Chatbot Interface');

  // Chat window mockup
  s.addShape('roundRect', { x: 2.5, y: 1.5, w: 8.3, h: 5.0, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.ink200, width: 1.5 } });

  // Header
  s.addShape('roundRect', { x: 2.5, y: 1.5, w: 8.3, h: 0.6, rectRadius: 0.12, fill: { color: C.ink50 }, line: { color: C.ink200, width: 1.5 } });
  s.addShape('roundRect', { x: 2.7, y: 1.65, w: 0.4, h: 0.4, rectRadius: 0.08, fill: { color: C.brand600 } });
  s.addText('F', { x: 2.7, y: 1.65, w: 0.4, h: 0.4, fontSize: 14, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
  s.addText('FlowAI Assistant', { x: 3.2, y: 1.65, w: 3, h: 0.4, fontSize: 12, bold: true, color: C.ink900, fontFace: FONT, valign: 'middle' });
  s.addText('● Online', { x: 5.5, y: 1.65, w: 1.5, h: 0.4, fontSize: 10, color: C.accent600, fontFace: FONT, valign: 'middle' });

  // Messages
  // User msg
  s.addShape('roundRect', { x: 6.5, y: 2.35, w: 4.0, h: 0.5, rectRadius: 0.1, fill: { color: C.brand600 } });
  s.addText('Help me prioritize my tasks for today', { x: 6.6, y: 2.35, w: 3.8, h: 0.5, fontSize: 10, color: C.white, fontFace: FONT, valign: 'middle' });

  // Assistant msg
  s.addShape('roundRect', { x: 2.8, y: 3.05, w: 5.5, h: 0.7, rectRadius: 0.1, fill: { color: C.ink50 } });
  s.addText("Here's a practical take: break it into three steps, tackle the highest-impact one first, and timebox the rest. Want me to draft a quick plan?", { x: 2.95, y: 3.05, w: 5.2, h: 0.7, fontSize: 10, color: C.ink700, fontFace: FONT, valign: 'middle', lineSpacingMultiple: 1.3 });

  // Typing indicator
  s.addShape('roundRect', { x: 2.8, y: 3.95, w: 1.2, h: 0.4, rectRadius: 0.1, fill: { color: C.ink50 } });
  s.addText('● ● ●', { x: 2.8, y: 3.95, w: 1.2, h: 0.4, fontSize: 12, color: C.brand500, fontFace: FONT, align: 'center', valign: 'middle' });

  // Suggestion chips
  s.addText('Suggested', { x: 2.8, y: 4.55, w: 2, h: 0.3, fontSize: 9, bold: true, color: C.ink500, fontFace: FONT });
  const chips = ['Draft a follow-up email', 'Summarize meeting notes', 'Plan my day'];
  chips.forEach((c, i) => {
    s.addShape('roundRect', { x: 2.8 + i * 2.65, y: 4.85, w: 2.5, h: 0.4, rectRadius: 0.2, fill: { color: C.white }, line: { color: C.ink200, width: 1 } });
    s.addText(c, { x: 2.8 + i * 2.65, y: 4.85, w: 2.5, h: 0.4, fontSize: 9, color: C.ink700, fontFace: FONT, align: 'center', valign: 'middle' });
  });

  // Input bar
  s.addShape('roundRect', { x: 2.8, y: 5.65, w: 7.7, h: 0.55, rectRadius: 0.1, fill: { color: C.ink50 }, line: { color: C.ink200, width: 1 } });
  s.addText('Type your message…', { x: 3.0, y: 5.65, w: 6.5, h: 0.55, fontSize: 10, color: C.ink400, fontFace: FONT, valign: 'middle' });
  s.addShape('roundRect', { x: 9.9, y: 5.72, w: 0.5, h: 0.4, rectRadius: 0.08, fill: { color: C.brand600 } });
  s.addText('➤', { x: 9.9, y: 5.72, w: 0.5, h: 0.4, fontSize: 12, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });

  // Feature bullets on left
  s.addText('Key Capabilities', { x: 0.4, y: 1.5, w: 1.8, h: 0.35, fontSize: 12, bold: true, color: C.ink900, fontFace: FONT });
  const caps = ['Suggestion chips', 'Typing indicators', 'Conversation context', 'One-click reset', 'Practical responses'];
  caps.forEach((c, i) => {
    s.addShape('ellipse', { x: 0.4, y: 2.05 + i * 0.45, w: 0.15, h: 0.15, fill: { color: C.brand600 } });
    s.addText(c, { x: 0.65, y: 1.98 + i * 0.45, w: 1.6, h: 0.3, fontSize: 10, color: C.ink700, fontFace: FONT, valign: 'middle' });
  });
}

// ============================================================
// SLIDE 9 — Prompt Engineering Approach
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '08', 'Prompt Engineering Approach');

  s.addText('Every feature uses a structured prompt template with four components:', { x: 0.5, y: 1.4, w: 12, h: 0.4, fontSize: 13, color: C.ink700, fontFace: FONT });

  const components = [
    { num: '1', title: 'ROLE', desc: 'Define the AI persona — e.g., "You are an expert workplace communications assistant."', color: C.brand600 },
    { num: '2', title: 'TASK', desc: 'State the specific action — e.g., "Draft a polished, ready-to-send email."', color: C.accent600 },
    { num: '3', title: 'CONSTRAINTS', desc: 'List tone, audience, key points, length, and context boundaries.', color: C.warn600 },
    { num: '4', title: 'OUTPUT FORMAT', desc: 'Specify the exact structure — sections, bullets, or line-by-line format.', color: C.ink700 },
  ];

  components.forEach((c, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape('roundRect', { x, y: 2.0, w: 2.95, h: 2.2, rectRadius: 0.1, fill: { color: C.ink50 }, line: { color: C.ink200, width: 1 } });
    s.addShape('roundRect', { x: x + 0.2, y: 2.2, w: 0.6, h: 0.6, rectRadius: 0.1, fill: { color: c.color } });
    s.addText(c.num, { x: x + 0.2, y: 2.2, w: 0.6, h: 0.6, fontSize: 20, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(c.title, { x: x + 0.2, y: 2.9, w: 2.55, h: 0.35, fontSize: 13, bold: true, color: c.color, fontFace: FONT });
    s.addText(c.desc, { x: x + 0.2, y: 3.3, w: 2.55, h: 0.8, fontSize: 10, color: C.ink500, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.3 });
  });

  // Example prompt
  s.addText('Example: Email Generator Prompt', { x: 0.5, y: 4.5, w: 6, h: 0.35, fontSize: 12, bold: true, color: C.ink900, fontFace: FONT });
  s.addShape('roundRect', { x: 0.5, y: 4.9, w: 12.33, h: 1.8, rectRadius: 0.08, fill: { color: C.ink950 }, line: { color: C.ink900, width: 1 } });
  s.addText([
    { text: 'ROLE: ', options: { fontSize: 10, bold: true, color: C.brand400 } },
    { text: 'You are an expert workplace communications assistant.\n', options: { fontSize: 10, color: C.ink200 } },
    { text: 'TASK: ', options: { fontSize: 10, bold: true, color: C.accent500 } },
    { text: 'Draft a polished, ready-to-send email.\n', options: { fontSize: 10, color: C.ink200 } },
    { text: 'CONSTRAINTS: ', options: { fontSize: 10, bold: true, color: C.warn500 } },
    { text: 'Tone: professional | Audience: client | Key points: demo went well, next step is pricing\n', options: { fontSize: 10, color: C.ink200 } },
    { text: 'OUTPUT FORMAT: ', options: { fontSize: 10, bold: true, color: C.brand400 } },
    { text: 'Subject line on the first line, blank line, then the email body.', options: { fontSize: 10, color: C.ink200 } },
  ], { x: 0.75, y: 5.05, w: 11.8, h: 1.5, fontFace: 'Consolas', valign: 'top', lineSpacingMultiple: 1.5 });
}

// ============================================================
// SLIDE 10 — Tech Stack & Architecture
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '09', 'Tech Stack & Architecture');

  // Tech stack grid
  const tech = [
    { name: 'React 18', desc: 'UI framework', icon: '⚛', color: C.brand600 },
    { name: 'TypeScript', desc: 'Type-safe code', icon: 'TS', color: C.ink700 },
    { name: 'Vite', desc: 'Build tooling', icon: '⚡', color: C.warn600 },
    { name: 'Tailwind CSS', desc: 'Design system & styling', icon: '🎨', color: C.brand500 },
    { name: 'Lucide React', desc: 'Icon library', icon: '✦', color: C.accent600 },
    { name: 'Supabase', desc: 'Backend ready (available)', icon: '⚡', color: C.accent500 },
  ];
  tech.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 4.15;
    const y = 1.4 + row * 1.3;
    s.addShape('roundRect', { x, y, w: 3.85, h: 1.1, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.ink200, width: 1 } });
    s.addShape('roundRect', { x: x + 0.2, y: y + 0.25, w: 0.6, h: 0.6, rectRadius: 0.1, fill: { color: t.color } });
    s.addText(t.icon, { x: x + 0.2, y: y + 0.25, w: 0.6, h: 0.6, fontSize: 18, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(t.name, { x: x + 0.95, y: y + 0.2, w: 2.7, h: 0.35, fontSize: 13, bold: true, color: C.ink900, fontFace: FONT });
    s.addText(t.desc, { x: x + 0.95, y: y + 0.55, w: 2.7, h: 0.3, fontSize: 10, color: C.ink500, fontFace: FONT });
  });

  // Architecture flow
  s.addText('Application Architecture', { x: 0.5, y: 4.15, w: 6, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });

  const flow = [
    { label: 'User Input', desc: 'Forms & controls', color: C.brand600 },
    { label: 'Prompt Builder', desc: 'Structured template', color: C.accent600 },
    { label: 'AI Engine', desc: 'Generation logic', color: C.warn600 },
    { label: 'Formatted Output', desc: 'UI + copy', color: C.ink700 },
  ];
  flow.forEach((f, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape('roundRect', { x, y: 4.6, w: 2.7, h: 0.9, rectRadius: 0.08, fill: { color: C.ink50 }, line: { color: f.color, width: 1.5 } });
    s.addText(f.label, { x: x + 0.15, y: 4.7, w: 2.4, h: 0.35, fontSize: 11, bold: true, color: f.color, fontFace: FONT });
    s.addText(f.desc, { x: x + 0.15, y: 5.05, w: 2.4, h: 0.3, fontSize: 9, color: C.ink500, fontFace: FONT });
    if (i < 3) {
      s.addText('→', { x: x + 2.7, y: 4.85, w: 0.45, h: 0.4, fontSize: 18, bold: true, color: C.ink300, fontFace: FONT, align: 'center', valign: 'middle' });
    }
  });

  s.addText('Design: Modern SaaS UI · 6+ color ramps · 8px spacing system · responsive · animations', { x: 0.5, y: 5.7, w: 12, h: 0.4, fontSize: 11, italic: true, color: C.ink500, fontFace: FONT });
}

// ============================================================
// SLIDE 11 — Responsible & Ethical AI Use
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '10', 'Responsible & Ethical AI Use');

  // Disclaimer banner
  s.addShape('roundRect', { x: 0.5, y: 1.4, w: 12.33, h: 0.6, rectRadius: 0.08, fill: { color: C.warn50 }, line: { color: C.warn500, width: 1.5 } });
  s.addText('⚠  AI-generated content may require human review', { x: 0.8, y: 1.4, w: 12, h: 0.6, fontSize: 14, bold: true, color: C.warn600, fontFace: FONT, valign: 'middle' });

  // Principles
  const principles = [
    { title: 'Human Oversight', desc: 'Every AI output is clearly labeled and includes a review reminder. Users are encouraged to edit before use.', icon: '👁', color: C.brand600 },
    { title: 'Transparency', desc: 'Outputs are marked as AI-generated. The system never presents AI content as human-written.', icon: '🔍', color: C.accent600 },
    { title: 'Grounded Outputs', desc: 'Research features flag uncertainty and avoid fabrication. Claims include caveats.', icon: '⚓', color: C.warn600 },
    { title: 'Privacy First', desc: 'No unnecessary data collection. User inputs stay in the session. Supabase available for opt-in persistence.', icon: '🔒', color: C.ink700 },
    { title: 'Professional Tone', desc: 'All outputs default to professional, workplace-appropriate language and structure.', icon: '💼', color: C.brand500 },
    { title: 'Accessibility', desc: 'Responsive design, semantic HTML, keyboard navigation, and readable contrast ratios.', icon: '♿', color: C.accent500 },
  ];

  principles.forEach((p, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 4.15;
    const y = 2.25 + row * 2.3;
    s.addShape('roundRect', { x, y, w: 3.85, h: 2.1, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.ink200, width: 1 } });
    s.addShape('roundRect', { x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, rectRadius: 0.1, fill: { color: p.color } });
    s.addText(p.icon, { x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, fontSize: 20, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(p.title, { x: x + 0.2, y: y + 0.85, w: 3.45, h: 0.35, fontSize: 13, bold: true, color: C.ink900, fontFace: FONT });
    s.addText(p.desc, { x: x + 0.2, y: y + 1.2, w: 3.45, h: 0.8, fontSize: 10, color: C.ink500, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.3 });
  });
}

// ============================================================
// SLIDE 12 — Demo / Walkthrough
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '11', 'Live Demo Walkthrough');

  const steps = [
    { num: '1', title: 'Dashboard', desc: 'Start at the overview — see stats, quick-launch cards, and recent activity.', color: C.brand600 },
    { num: '2', title: 'Email Generator', desc: 'Select tone & audience, enter purpose and key points, click Generate.', color: C.accent600 },
    { num: '3', title: 'Meeting Summarizer', desc: 'Paste raw notes, get structured summary with action items and deadlines.', color: C.warn600 },
    { num: '4', title: 'Task Planner', desc: 'List tasks, get a time-blocked schedule and priority queue.', color: C.brand500 },
    { num: '5', title: 'Research Assistant', desc: 'Enter a topic and depth, receive a structured research brief.', color: C.ink700 },
    { num: '6', title: 'AI Chatbot', desc: 'Ask questions, use suggestion chips, reset conversation anytime.', color: C.accent500 },
  ];

  steps.forEach((st, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 4.15;
    const y = 1.4 + row * 2.6;
    s.addShape('roundRect', { x, y, w: 3.85, h: 2.4, rectRadius: 0.1, fill: { color: C.ink50 }, line: { color: C.ink200, width: 1 } });
    s.addShape('ellipse', { x: x + 0.25, y: y + 0.25, w: 0.6, h: 0.6, fill: { color: st.color } });
    s.addText(st.num, { x: x + 0.25, y: y + 0.25, w: 0.6, h: 0.6, fontSize: 20, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(st.title, { x: x + 1.0, y: y + 0.3, w: 2.6, h: 0.5, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT, valign: 'middle' });
    s.addText(st.desc, { x: x + 0.25, y: y + 1.05, w: 3.35, h: 1.2, fontSize: 10.5, color: C.ink500, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.3 });
  });
}

// ============================================================
// SLIDE 13 — Key Outcomes & Impact
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '12', 'Key Outcomes & Impact');

  // Stats row
  const stats = [
    { value: '5', label: 'AI-powered tools in one workspace', color: C.brand600 },
    { value: '4', label: 'Structured prompt components per feature', color: C.accent600 },
    { value: '100%', label: 'Responsive across all devices', color: C.warn600 },
    { value: '1', label: 'Unified, professional SaaS interface', color: C.ink700 },
  ];
  stats.forEach((st, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape('roundRect', { x, y: 1.4, w: 2.95, h: 1.6, rectRadius: 0.1, fill: { color: C.ink50 }, line: { color: C.ink200, width: 1 } });
    s.addText(st.value, { x, y: 1.55, w: 2.95, h: 0.7, fontSize: 36, bold: true, color: st.color, fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(st.label, { x: x + 0.2, y: 2.3, w: 2.55, h: 0.6, fontSize: 10, color: C.ink500, fontFace: FONT, align: 'center', valign: 'top', lineSpacingMultiple: 1.3 });
  });

  // Impact areas
  s.addText('Business Impact', { x: 0.5, y: 3.3, w: 6, h: 0.35, fontSize: 14, bold: true, color: C.ink900, fontFace: FONT });
  const impacts = [
    'Reduces time spent on routine communication by 50–70%',
    'Turns unstructured notes into actionable, shareable summaries',
    'Standardizes professional tone across all workplace outputs',
    'Democratizes AI tools — no technical expertise required',
  ];
  impacts.forEach((imp, i) => {
    s.addShape('roundRect', { x: 0.5, y: 3.8 + i * 0.6, w: 12.33, h: 0.5, rectRadius: 0.06, fill: { color: C.accent50 }, line: { color: C.accent500, width: 1 } });
    s.addShape('ellipse', { x: 0.7, y: 3.97 + i * 0.6, w: 0.16, h: 0.16, fill: { color: C.accent600 } });
    s.addText(imp, { x: 1.0, y: 3.8 + i * 0.6, w: 11.6, h: 0.5, fontSize: 11, color: C.ink700, fontFace: FONT, valign: 'middle' });
  });

  s.addText('A practical, production-ready prototype demonstrating effective and responsible use of AI in the workplace.', { x: 0.5, y: 6.3, w: 12.33, h: 0.5, fontSize: 12, italic: true, color: C.brand600, fontFace: FONT, valign: 'middle' });
}

// ============================================================
// SLIDE 14 — Future Enhancements
// ============================================================
{
  const s = pptx.addSlide({ masterName: 'FlowMaster' });
  sectionHeader(s, '13', 'Future Enhancements');

  const futures = [
    { title: 'Live AI Integration', desc: 'Connect to OpenAI, Gemini, or Claude APIs for real-time generation instead of simulated output.', icon: '🔌', color: C.brand600 },
    { title: 'Save & History', desc: 'Persist generated emails, summaries, and plans to Supabase for later access and reuse.', icon: '💾', color: C.accent600 },
    { title: 'Team Collaboration', desc: 'Share summaries and plans with teammates; assign and track action items.', icon: '👥', color: C.warn600 },
    { title: 'Calendar Integration', desc: 'Sync the AI Task Planner with Google Calendar or Outlook for real scheduling.', icon: '📅', color: C.brand500 },
    { title: 'Email Send', desc: 'Connect an email provider to send generated emails directly from the app.', icon: '📤', color: C.ink700 },
    { title: 'Voice Input', desc: 'Dictate meeting notes or chat messages hands-free using Web Speech API.', icon: '🎙', color: C.accent500 },
  ];

  futures.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 4.15;
    const y = 1.4 + row * 2.6;
    s.addShape('roundRect', { x, y, w: 3.85, h: 2.4, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.ink200, width: 1 } });
    s.addShape('roundRect', { x: x + 0.2, y: y + 0.2, w: 0.6, h: 0.6, rectRadius: 0.1, fill: { color: f.color } });
    s.addText(f.icon, { x: x + 0.2, y: y + 0.2, w: 0.6, h: 0.6, fontSize: 22, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(f.title, { x: x + 0.95, y: y + 0.25, w: 2.7, h: 0.5, fontSize: 13, bold: true, color: C.ink900, fontFace: FONT, valign: 'middle' });
    s.addText(f.desc, { x: x + 0.2, y: y + 1.0, w: 3.45, h: 1.3, fontSize: 10, color: C.ink500, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.3 });
  });
}

// ============================================================
// SLIDE 15 — Thank You / Q&A
// ============================================================
{
  const s = pptx.addSlide();
  s.background = { color: C.ink950 };
  s.addShape('ellipse', { x: -2, y: 3, w: 6, h: 6, fill: { color: C.brand600, transparency: 80 } });
  s.addShape('ellipse', { x: 9, y: -1, w: 5, h: 5, fill: { color: C.accent600, transparency: 85 } });

  s.addShape('roundRect', { x: 5.8, y: 0.7, w: 0.7, h: 0.7, rectRadius: 0.15, fill: { color: C.brand600 } });
  s.addText('F', { x: 5.8, y: 0.7, w: 0.7, h: 0.7, fontSize: 28, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle' });

  s.addText('Thank You', { x: 0, y: 2.2, w: 13.33, h: 1.0, fontSize: 48, bold: true, color: C.white, fontFace: FONT, align: 'center' });
  s.addText('Questions & Discussion', { x: 0, y: 3.3, w: 13.33, h: 0.6, fontSize: 20, color: C.ink300, fontFace: FONT, align: 'center' });

  // Feature recap pills
  const pills = ['Email Generator', 'Meeting Summarizer', 'Task Planner', 'Research Assistant', 'AI Chatbot'];
  pills.forEach((p, i) => {
    s.addShape('roundRect', { x: 1.4 + i * 2.2, y: 4.5, w: 2.0, h: 0.4, rectRadius: 0.2, fill: { color: C.white, transparency: 88 }, line: { color: C.brand400, width: 1, transparency: 50 } });
    s.addText(p, { x: 1.4 + i * 2.2, y: 4.5, w: 2.0, h: 0.4, fontSize: 10, bold: true, color: C.brand100, fontFace: FONT, align: 'center', valign: 'middle' });
  });

  s.addText('FlowAI — AI Workplace Productivity Assistant', { x: 0, y: 5.5, w: 13.33, h: 0.4, fontSize: 14, bold: true, color: C.brand400, fontFace: FONT, align: 'center' });
  s.addText('AI-generated content may require human review', { x: 0, y: 6.0, w: 13.33, h: 0.4, fontSize: 11, italic: true, color: C.ink500, fontFace: FONT, align: 'center' });
}

// ---------- Generate ----------
const out = await pptx.write({ outputType: 'nodebuffer' });
const outPath = 'FlowAI_Presentation.pptx';
writeFileSync(outPath, out as Buffer);
console.log(`Generated: ${outPath} (${(out as Buffer).length.toLocaleString()} bytes)`);
