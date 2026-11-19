import {
  Briefcase,
  Cpu,
  GraduationCap,
  Handshake,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import flexibleContractsImage from "@/photos/services/flexible-contracts.webp";
import customAiSoftwareImage from "@/photos/services/custom-ai-software.webp";
import collaborativeDevelopmentImage from "@/photos/services/collaborative-development.webp";
import freeAiTrainingImage from "@/photos/services/free-ai-training.webp";
import ongoingTechnicalDevelopmentImage from "@/photos/services/ongoing-technical-development.webp";
import newIdeasPartnershipsImage from "@/photos/services/new-ideas-partnerships.webp";

/*
 * The navbar, footer, page metadata, privacy policy and contact form all read from this object.
 */
export const COMPANY = {
  name: "DoMultiWork",
  email: "2.r.3.141592@gmail.com",
  tagline: "Software Contracts, AI & Development",
  metaDescription:
    "Get support managing multiple software development contracts, find experienced developers for your project or build practical AI skills with free beginner training.",
} as const;

/* One-page navigation: every link points to an anchor on the home page. */
export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Services", href: "/#services" },
  { label: "Our Approach", href: "/#our-approach" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
];

export const FOOTER_LINKS = [
  ...NAV_LINKS.slice(1),
  { label: "Privacy Policy", href: "/privacy" },
];

/* Values of the "What can we help you with?" select. Ids are used in ?inquiry= links. */
export const INQUIRY_OPTIONS = [
  { id: "flexible-contracts", label: "Flexible contract opportunities" },
  { id: "custom-ai-software", label: "Custom AI or software development" },
  { id: "collaborative-development", label: "Collaborative development or technical support" },
  { id: "free-ai-training", label: "Free AI training" },
  { id: "ongoing-technical-development", label: "Ongoing technical development" },
  { id: "new-idea-partnership", label: "New idea or partnership" },
  { id: "something-else", label: "Something else" },
] as const;

export type InquiryId = (typeof INQUIRY_OPTIONS)[number]["id"];

export function isInquiryId(value: string | null): value is InquiryId {
  return INQUIRY_OPTIONS.some((option) => option.id === value);
}

/* Link to the contact form, optionally preselecting an inquiry option. */
export function contactHref(inquiry?: InquiryId): string {
  return inquiry ? `/?inquiry=${inquiry}#contact` : "/#contact";
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  image: StaticImageData;
}

export const SERVICES: Service[] = [
  {
    title: "Flexible Contract Opportunities",
    description:
      "We help professionals earn extra income by taking on multiple flexible contracts at once while keeping their workload manageable.",
    icon: Briefcase,
    image: flexibleContractsImage,
  },
  {
    title: "Custom AI & Software Development",
    description:
      "We develop AI solutions and software products tailored to the goals and requirements of each project.",
    icon: Cpu,
    image: customAiSoftwareImage,
  },
  {
    title: "Collaborative Development & Technical Support",
    description:
      "We bring experienced developers into existing teams to provide technical support or contribute directly to joint development projects.",
    icon: Users,
    image: collaborativeDevelopmentImage,
  },
  {
    title: "Free AI Training for Beginners",
    description:
      "We offer free training that helps people new to AI build the skills they need to pursue paid assignments and small contracts.",
    icon: GraduationCap,
    image: freeAiTrainingImage,
  },
  {
    title: "Ongoing Technical Development",
    description:
      "We evaluate emerging technologies and technical approaches, document their strengths and limitations, and share our findings in a format our developers can apply in their work.",
    icon: Search,
    image: ongoingTechnicalDevelopmentImage,
  },
  {
    title: "New Ideas & Partnerships",
    description:
      "We welcome fresh ideas for working together, sharing knowledge or supporting a project. If your idea is something we can make work, we’ll work with you directly or put a clear contract in place to move it forward.",
    icon: Handshake,
    image: newIdeasPartnershipsImage,
  },
];
