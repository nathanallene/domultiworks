"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants";
import { SERVICES_HEADING } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ServicesOverview() {
  return (
    <section id="services" className="relative scroll-mt-16 py-24 lg:py-32">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={SERVICES_HEADING} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={fadeInUp}
                className="group relative isolate flex min-h-[26rem] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 dark:border-white/[0.08] lg:p-8"
              >
                {/* Background picture: optimized by next/image, lazy-loaded, 30% opacity (100% on hover) */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 -top-6 -z-20 h-[70%] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-30 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>

                {/* Gradient keeps the text readable over the picture */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-card via-card/70 to-transparent" />

                {/* Accent line on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/80" />

                <div className="flex items-center justify-between">
                  <div className="inline-flex rounded-xl border border-border/60 bg-background/50 p-3 text-primary backdrop-blur-md transition-transform duration-300 group-hover:scale-110 dark:border-white/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border/60 bg-background/50 px-3 py-1 font-mono text-xs text-foreground backdrop-blur-md dark:border-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-auto pt-24">
                  <h3 className="mb-3 font-display text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
