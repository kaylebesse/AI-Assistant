import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Microscope,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';

export type ViewId =
  | 'dashboard'
  | 'email'
  | 'meeting'
  | 'planner'
  | 'research'
  | 'chatbot';

export interface NavItem {
  id: ViewId;
  label: string;
  short: string;
  icon: LucideIcon;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    short: 'Home',
    icon: LayoutDashboard,
    description: 'Your productivity overview',
  },
  {
    id: 'email',
    label: 'Email Generator',
    short: 'Email',
    icon: Mail,
    description: 'Draft polished emails by tone and audience',
  },
  {
    id: 'meeting',
    label: 'Meeting Summarizer',
    short: 'Meetings',
    icon: FileText,
    description: 'Turn notes into key points and actions',
  },
  {
    id: 'planner',
    label: 'Task Planner',
    short: 'Planner',
    icon: ListChecks,
    description: 'Prioritize and schedule your day',
  },
  {
    id: 'research',
    label: 'Research Assistant',
    short: 'Research',
    icon: Microscope,
    description: 'Get insights and summaries fast',
  },
  {
    id: 'chatbot',
    label: 'AI Chatbot',
    short: 'Chat',
    icon: MessageSquare,
    description: 'Ask anything and get practical answers',
  },
];
