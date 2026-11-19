"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { buttonVariants } from "@/components/ui/Button";
import { contactHref } from "@/lib/constants";
import { HERO } from "@/lib/content";
import { fadeIn } from "@/lib/animations";

const HeroParticles = dynamic(
  () => import("./HeroParticles").then((mod) => ({ default: mod.HeroParticles })),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-16 items-center justify-center overflow-hidden"
    >
      {/* The page background picture shows through; only soft glows are added here */}
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

      {/* 3D Particles */}
      <HeroParticles />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* Headline */}
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          <TextReveal text={HERO.headline} />
        </h1>

        {/* Body */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="mx-auto mt-8 max-w-3xl text-lg text-muted-foreground sm:text-xl"
        >
          {HERO.body}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href={contactHref(HERO.primaryCta.inquiry)}
            className={buttonVariants({ size: "lg" })}
          >
            {HERO.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={contactHref(HERO.secondaryCta.inquiry)}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            {HERO.secondaryCta.label}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
