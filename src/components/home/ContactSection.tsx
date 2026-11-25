"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { COMPANY } from "@/lib/constants";
import { CONTACT } from "@/lib/content";
import { slideInLeft, slideInRight } from "@/lib/animations";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-16 border-t border-border/50 py-24 dark:border-white/[0.06] lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={CONTACT.heading} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="space-y-8 lg:col-span-2"
          >
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-foreground">{CONTACT.title}</h3>
              <p className="text-muted-foreground">{CONTACT.intro}</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-primary/5 p-6 shadow-lg shadow-primary/15 dark:bg-primary/10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                  <Calendar className="h-6 w-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-foreground">
                  {CONTACT.scheduleHeading}
                </h4>
                <p className="text-sm text-muted-foreground">{CONTACT.scheduleIntro}</p>
                <a
                  href={COMPANY.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}
                >
                  <Calendar className="h-5 w-5" />
                  {CONTACT.scheduleCta}
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold text-foreground">
                {CONTACT.includeHeading}
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {CONTACT.includeItems.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      <span className="font-medium text-foreground">{item.label}</span>
                      {" — "}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              {CONTACT.preferEmail}{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-medium text-primary hover:underline"
              >
                {COMPANY.email}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="lg:col-span-3"
          >
            {/* useSearchParams requires a Suspense boundary for static rendering */}
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
