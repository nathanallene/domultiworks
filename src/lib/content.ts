import { Code2, GraduationCap, Layers, type LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { InquiryId } from "./constants";
import forSoftwareProfessionalsImage from "@/photos/whatwedo/for-software-professionals.webp";
import forBusinessTeamsImage from "@/photos/whatwedo/for-business-teams.webp";
import forAiBeginnersImage from "@/photos/whatwedo/for-ai-beginners.webp";
import stepTellUsImage from "@/photos/howitworks/step-1-tell-us.webp";
import stepTalkThroughImage from "@/photos/howitworks/step-2-talk-through.webp";
import stepNextStepImage from "@/photos/howitworks/step-3-next-step.webp";

export interface WhatWeDoAudience {
  heading: string;
  body: string;
  cta: { label: string; inquiry: InquiryId };
  icon: LucideIcon;
  image: StaticImageData;
}

export const HERO = {
  headline: "Taking on multiple software development contracts with our support.",
  body:
    "We help software professionals manage several contracts at once so they can focus on growing their income without feeling overwhelmed. We’ve gained valuable experience handling multiple contracts, and we’re here to share that knowledge and help you manage yours more smoothly. By working with us, you’ll have the support you need to handle more contracts and create opportunities for higher earnings.",
  primaryCta: { label: "Explore contract opportunities", inquiry: "flexible-contracts" as InquiryId },
  secondaryCta: { label: "Discuss a project", inquiry: "custom-ai-software" as InquiryId },
};

export const WHAT_WE_DO = {
  heading: "What We Do",
  subtitle: "Flexible work for developers. Hands-on support for teams.",
  intro:
    "We work with software professionals looking to take on additional contracts and with teams that need experienced developers. We also offer free beginner AI training for people who want to build practical skills before pursuing their first paid assignments.",
  audiences: [
    {
      heading: "For software professionals",
      body:
        "If you already have a project on the go, tell us what kind of work you enjoy and how much time you can realistically commit. We can talk through the scope and deadlines of an additional contract so you can decide whether it fits.",
      cta: { label: "Explore contract opportunities", inquiry: "flexible-contracts" },
      icon: Code2,
      image: forSoftwareProfessionalsImage,
    },
    {
      heading: "For businesses and project teams",
      body:
        "Bring us a new software idea or tell us where your existing team needs a hand. We can discuss building an AI or software solution, joining your team for part of a project or providing technical support where you need it.",
      cta: { label: "Discuss a project", inquiry: "custom-ai-software" },
      icon: Layers,
      image: forBusinessTeamsImage,
    },
    {
      heading: "For people new to AI",
      body:
        "If you’re curious about AI and want to build skills you can use on real projects, get in touch about our free beginner training. Tell us what you’d like to learn and where you’re starting from.",
      cta: { label: "Ask about AI training", inquiry: "free-ai-training" },
      icon: GraduationCap,
      image: forAiBeginnersImage,
    },
  ] satisfies WhatWeDoAudience[],
};

export const SERVICES_HEADING = "Our Core Services";

export const OUR_APPROACH = {
  heading: "Our Approach",
  paragraphs: [
    "We make sure our experienced, highly skilled software engineers are equipped to manage several projects and contracts at once, even with a substantial workload. Trust is our core value. We build mutual confidence by prioritizing our partners’ requirements and feedback, and we reinforce that confidence through the quality of our work.",
    "Ultimately, we aim to generate more revenue through collaboration and improve the quality of life for everyone involved.",
  ],
};

export interface HowItWorksStep {
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
}

export const HOW_IT_WORKS = {
  heading: "How It Works",
  steps: [
    {
      title: "Tell us what you’re looking for",
      description:
        "Share the kind of contract you want, the problem your team needs help solving or what you’d like to learn about AI. A short message is enough to start.",
      image: stepTellUsImage,
      imageAlt:
        "A message bubble with a red arrow, representing sending us a short message",
    },
    {
      title: "Talk through what fits",
      description:
        "For contract work, we’ll discuss your skills, availability and current commitments. For a project, we’ll talk through your goals, timeline and the kind of support your team needs.",
      image: stepTalkThroughImage,
      imageAlt: "Two puzzle pieces fitting together, representing finding the right fit",
    },
    {
      title: "Agree on the next step",
      description:
        "If we decide to work together, we’ll agree on the scope, responsibilities and timing before work starts. If you’re asking about training, we’ll discuss where to begin.",
      image: stepNextStepImage,
      imageAlt:
        "A red checkmark with an arrow pointing onward, representing agreeing the next step",
    },
  ] satisfies HowItWorksStep[],
};

export const FAQ = {
  heading: "Frequently Asked Questions",
  items: [
    {
      question: "How do I get started with flexible contract opportunities?",
      answer:
        "Tell us about your development experience, how much time you have available and the type of work you’re looking for. We can discuss what may fit your skills and current workload.",
    },
    {
      question: "Can I reach out if I’m already working on a contract?",
      answer:
        "Yes. Let us know what time you have available and what your existing agreements allow so we can discuss what would fit.",
    },
    {
      question: "Will I receive a paid assignment after training?",
      answer:
        "The training is free and designed to help beginners build skills for paid assignments and small contracts. Paid work depends on available opportunities and the skills each assignment requires.",
    },
    {
      question: "Can your developers work with our existing team?",
      answer:
        "Yes. Our developers can provide technical support or contribute directly to a joint development project. Tell us what your team is building and where you could use help.",
    },
    {
      question: "What should I include in a project inquiry?",
      answer:
        "Share a short overview of what you want to build, where the project stands and when you’d like to get started.",
    },
    {
      question: "Can I suggest a partnership?",
      answer:
        "Yes. Tell us what you have in mind and how you’d like to work together. If there’s a fit, we can discuss how to move it forward.",
    },
    {
      question: "How much can I earn from additional contracts?",
      answer:
        "Earnings depend on the work available, the rates agreed for each contract and the time you can commit. We can discuss those details when there’s a specific opportunity to consider.",
    },
    {
      question: "Do I need AI experience to ask about training?",
      answer:
        "No. The free training is designed for beginners. Tell us what you’d like to learn or what kinds of assignments interest you.",
    },
    {
      question: "Can we reach out before we have a full project brief?",
      answer:
        "Yes. Start with the problem you’re trying to solve, who it affects and what you’d like to improve. We can discuss what support would make sense from there.",
    },
  ],
};

export const CONTACT = {
  heading: "Contact Us",
  title: "Tell us what you’d like to work on",
  intro:
    "Whether you’re looking for your next contract, need help with a software project or want to learn more about AI training, send us a short note about what you’re looking for.",
  includeHeading: "What to include in your message",
  includeItems: [
    {
      label: "Contract opportunities",
      text: "Tell us about your main skills, the work you’re looking for and how much time you have available.",
    },
    {
      label: "Development or technical support",
      text: "Tell us what you’re building, where you need help and any timeline you’re working toward.",
    },
    {
      label: "Training or partnerships",
      text: "Tell us what you’d like to learn or share a short description of the idea you’d like to explore.",
    },
  ],
  scheduleHeading: "Schedule a meeting",
  scheduleIntro:
    "Prefer to talk it through? Book a 30-minute call and we can go over what you need.",
  scheduleCta: "Book a 30-minute meeting",
  preferEmail: "Prefer email? Reach us at",
  form: {
    nameLabel: "Full name (required)",
    emailLabel: "Email address (required)",
    companyLabel: "Company or team (optional)",
    inquiryLabel: "What can we help you with? (required)",
    inquiryPlaceholder: "Select an option",
    messageLabel: "Message (required)",
    messagePlaceholder:
      "A few details about your goals, availability or project are enough to get started.",
    submit: "Send message",
    sending: "Sending...",
    success: "Thanks for reaching out. Your message has been sent.",
    error: "We couldn’t send your message. Please try again or email us at",
  },
};