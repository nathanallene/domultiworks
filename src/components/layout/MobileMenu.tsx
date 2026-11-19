"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_LINKS, contactHref } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/Button";
import { mobileMenuVariants, mobileMenuItemVariants } from "@/lib/animations";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={mobileMenuVariants}
      className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl pt-20 lg:hidden"
    >
      <nav className="flex flex-1 flex-col items-center justify-center gap-6">
        {NAV_LINKS.map((link, i) => (
          <motion.div key={link.href} custom={i} variants={mobileMenuItemVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className="text-2xl font-display font-bold text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.div custom={NAV_LINKS.length} variants={mobileMenuItemVariants}>
          <Link
            href={contactHref()}
            onClick={onClose}
            className={buttonVariants({ size: "lg" })}
          >
            Get in touch
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  );
}
