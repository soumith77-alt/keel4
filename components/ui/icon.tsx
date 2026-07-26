import * as React from "react";
import {
  Award,
  BarChart3,
  CalendarCheck,
  Clock,
  Headphones,
  Layers,
  PhoneCall,
  RefreshCw,
  Bot,
  Boxes,
  Braces,
  Briefcase,
  Clapperboard,
  Cog,
  Database,
  FileText,
  Film,
  GitBranch,
  Globe,
  Globe2,
  GraduationCap,
  LayoutTemplate,
  Mic,
  MonitorSmartphone,
  Plug,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Video,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Single icon vocabulary for the whole site.
 *
 * Content files reference icons by string name so `config/content.ts` stays
 * pure data. This replaces two things: the emoji icons that were rendered at
 * 6xl as service page heroes, and the 50-line inline SVG `switch` statement
 * that lived inside app/services/[slug]/page.tsx.
 */
const ICONS = {
  // Services
  mic: Mic,
  bot: Bot,
  clapperboard: Clapperboard,
  globe2: Globe2,
  // Feature vocabulary
  workflow: Workflow,
  branch: GitBranch,
  plug: Plug,
  shield: ShieldCheck,
  cog: Cog,
  chart: BarChart3,
  database: Database,
  users: Users,
  boxes: Boxes,
  document: FileText,
  film: Film,
  sparkles: Sparkles,
  globe: Globe,
  video: Video,
  device: MonitorSmartphone,
  rocket: Rocket,
  academic: GraduationCap,
  code: Braces,
  bolt: Zap,
  window: LayoutTemplate,
  cart: ShoppingCart,
  briefcase: Briefcase,
  award: Award,
  calendar: CalendarCheck,
  clock: Clock,
  headphones: Headphones,
  layers: Layers,
  phone: PhoneCall,
  refresh: RefreshCw,
} as const;

export type IconName = keyof typeof ICONS;

export function isIconName(value: string): value is IconName {
  return value in ICONS;
}

type IconProps = {
  name: IconName | (string & {});
  className?: string;
  /** Pixel size — defaults to 24 to match the icon-md token. */
  size?: number;
  strokeWidth?: number;
};

export function Icon({
  name,
  className,
  size = 24,
  strokeWidth = 1.5,
}: IconProps) {
  const Component: LucideIcon = isIconName(name) ? ICONS[name] : Sparkles;

  return (
    <Component
      aria-hidden
      focusable="false"
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
    />
  );
}

export default Icon;
