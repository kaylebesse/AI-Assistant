# FlowAI — AI Workplace Productivity Assistant

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-4zg3eutz)

A modern, responsive web application that helps professionals automate daily work tasks using AI. Built with a clean SaaS-style UI, sidebar navigation, and five fully interactive AI-powered tools.

![FlowAI Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80)

## Features

### Smart Email Generator
Draft polished, ready-to-send emails tailored by **tone** (professional, friendly, persuasive, apologetic, assertive) and **audience** (client, manager, team, vendor, customer). Add your purpose, key points, and call to action — get a structured email with subject line and sign-off. One-click copy to clipboard.

### Meeting Notes Summarizer
Paste raw meeting notes and get a structured brief:
- **Summary** — 2–3 sentence overview
- **Key Points** — the most important takeaways
- **Action Items** — with assigned owners
- **Deadlines** — any dates mentioned
- **Open Questions** — unresolved items

### AI Task Planner
Turn a raw task list into a prioritized, time-blocked schedule using Eisenhower-style urgency/importance ranking:
- **Today's Plan** — time-blocked schedule
- **Priority Queue** — ranked with rationale
- **Defer / Delegate** — tasks to move out or hand off
- **Notes** — focus and risk tips

### AI Research Assistant
Get a structured research brief on any topic at three depth levels (brief, standard, detailed):
- **Overview** — framing summary
- **Key Insights** — 3–5 bullet points
- **Considerations** — risks, caveats, trade-offs
- **Recommended Next Steps** — actionable suggestions

### AI Chatbot Interface
A conversational assistant with suggestion chips, typing indicators, and reset capability. Ask anything about your work and get concise, practical answers.

## Design

- **Modern SaaS UI** — clean, minimal, professional aesthetic
- **Sidebar navigation** + card-based layout
- **Custom design system** — 6+ color ramps, 8px spacing system, Plus Jakarta Sans typography
- **Fully responsive** — mobile drawer navigation with overlay, optimized for all viewport sizes
- **Animations & micro-interactions** — hover states, transitions, fade-in/scale-in animations, typing dots
- **Loading states** on every AI feature
- **AI disclaimer** — "AI-generated content may require human review" shown on all AI outputs

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tooling
- **Tailwind CSS** — styling and design system
- **Lucide React** — icons
- **Structured prompt engineering** — each feature uses a role/task/constraints/output-format prompt template

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── AIDisclaimer.tsx
│   ├── Card.tsx
│   ├── CopyButton.tsx
│   ├── FormattedOutput.tsx
│   ├── GeneratingState.tsx
│   ├── PageHeader.tsx
│   ├── Sidebar.tsx
│   └── Topbar.tsx
├── lib/
│   ├── aiEngine.ts    # Structured prompt templates + generation logic
│   └── nav.ts         # Navigation configuration
├── views/             # Feature pages
│   ├── Dashboard.tsx
│   ├── EmailGenerator.tsx
│   ├── MeetingSummarizer.tsx
│   ├── TaskPlanner.tsx
│   ├── ResearchAssistant.tsx
│   └── Chatbot.tsx
├── App.tsx            # App shell + routing
├── main.tsx
└── index.css          # Global styles + design tokens
```

## Responsible AI Use

FlowAI is designed as a prototype to demonstrate AI-assisted workplace productivity. Every AI-generated output includes a reminder that **AI-generated content may require human review**. Outputs should be reviewed and edited before being used in professional contexts.

## License

This project is a prototype for demonstration purposes.
