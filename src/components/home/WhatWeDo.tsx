"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";
import { contactHref } from "@/lib/constants";
import { WHAT_WE_DO } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="relative scroll-mt-16 border-t border-border/50 py-24 dark:border-white/[0.06] lg:py-32"
    >
      {/* Soft glow behind the cards */}
      <div className="pointer-events-none absolute left-1/2 top-2/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={WHAT_WE_DO.heading} subtitle={WHAT_WE_DO.subtitle} />

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mx-auto -mt-8 mb-16 max-w-3xl text-center text-lg text-muted-foreground"
        >
          {WHAT_WE_DO.intro}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {WHAT_WE_DO.audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.article
                key={audience.heading}
                variants={fadeInUp}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card",
                  "dark:border-white/[0.08]",
                  "transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
                  // On tablets the odd last card is centered at the same width as the others
                  index === WHAT_WE_DO.audiences.length - 1 &&
                    "md:col-span-2 md:w-[calc(50%-0.75rem)] md:justify-self-center lg:col-span-1 lg:w-auto lg:justify-self-auto"
                )}
              >
                {/* Picture: optimized by next/image and lazy-loaded; fades into the card */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]">
                    <Image
                      src={audience.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Accent line on hover */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/80" />

                  <div className="absolute left-5 top-5 inline-flex rounded-xl border border-border/60 bg-background/50 p-3 text-primary backdrop-blur-md transition-transform duration-300 group-hover:scale-110 dark:border-white/10">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="relative -mt-8 flex flex-1 flex-col p-6 pt-0 lg:p-8 lg:pt-0">
                  <h3 className="mb-3 font-display text-xl font-bold text-foreground">
                    {audience.heading}
                  </h3>
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-foreground/70">
                    {audience.body}
                  </p>
                  <Link
                    href={contactHref(audience.cta.inquiry)}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "md" }),
                      "self-start"
                    )}
                  >
                    {audience.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
