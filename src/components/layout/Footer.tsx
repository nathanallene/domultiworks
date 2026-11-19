import Link from "next/link";
import { Layers } from "lucide-react";
import { COMPANY, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <Link href="/#home" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <Layers className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                {COMPANY.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{COMPANY.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {COMPANY.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
