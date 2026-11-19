"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOW_IT_WORKS, OUR_APPROACH } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function OurApproach() {
  const [lead, ...rest] = OUR_APPROACH.paragraphs;

  return (
    <section
      id="our-approach"
      className="relative scroll-mt-16 overflow-hidden border-t border-border/50 py-24 dark:border-white/[0.06] lg:py-32"
    >
      {/* Soft glow behind the steps */}
      <div className="pointer-events-none absolute left-1/2 top-[70%] h-[420px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={OUR_APPROACH.heading} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mx-auto max-w-3xl space-y-6 text-center text-lg text-muted-foreground"
        >
          <p>{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="font-medium text-foreground/90">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <div className="mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {HOW_IT_WORKS.heading}
            </h3>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/30" />
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative mx-auto grid max-w-xl grid-cols-1 gap-10 lg:max-w-none lg:grid-cols-3 lg:gap-6"
          >
            {/* Connector: vertical between stacked cards, horizontal through the numbers on desktop */}
            <motion.div
              aria-hidden
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 1.1, delay: 0.3, ease: "easeOut" },
                },
              }}
              className={cn(
                "pointer-events-none absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 origin-top",
                "bg-gradient-to-b from-primary via-primary/60 to-primary/20",
                "lg:bottom-auto lg:left-[16.6667%] lg:right-[16.6667%] lg:h-px lg:w-auto lg:translate-x-0 lg:origin-left",
                "lg:bg-gradient-to-r lg:from-primary/30 lg:via-primary lg:to-primary/30",
                "shadow-[0_0_12px_rgba(229,9,20,0.6)]"
              )}
            />

            {HOW_IT_WORKS.steps.map((step, index) => (
              <motion.li
                key={step.title}
                variants={fadeInUp}
                className="group relative z-10 flex flex-col items-center"
              >
                {/* Numbered node sitting on the connector */}
                <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-white shadow-[0_0_0_8px_hsl(var(--background)),0_0_28px_rgba(229,9,20,0.5)] transition-transform duration-300 group-hover:scale-110">
                  {index + 1}
                </div>

                <div
                  className={cn(
                    "relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card",
                    "dark:border-white/[0.08]",
                    "transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/10"
                  )}
                >
                  {/* Picture: optimized by next/image and lazy-loaded; fades into the card */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 576px, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/80" />
                  </div>

                  <div className="relative -mt-8 flex-1 p-6 pt-0 lg:p-8 lg:pt-0">
                    <h4 className="mb-3 font-display text-xl font-bold text-foreground">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
