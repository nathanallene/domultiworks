"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/lib/content";
import { fadeInUp } from "@/lib/animations";

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-16 border-t border-border/50 py-24 dark:border-white/[0.06] lg:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={FAQ.heading} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-4"
        >
          {FAQ.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-border/50 bg-card open:border-primary/30 dark:border-white/[0.08] dark:bg-white/[0.03]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
