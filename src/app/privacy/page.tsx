import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${COMPANY.name} handles personal information submitted through our website and contact form.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: [Date]</p>

        <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
          <p>
            This page explains how {COMPANY.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
            personal information when you visit this website and when you send us a message
            through our contact form.
          </p>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              1. Information we collect
            </h2>
            <p>
              When you send a message through the contact form, we collect the details you enter:
              your full name, your email address, your company or team (optional), the area you want
              help with, and the message itself. Please only share what is needed for your enquiry.
            </p>
            <p>
              When you visit the website, we may collect your IP address and approximate location
              (such as city and country), plus related network details from our IP lookup provider.
              We use this to understand site traffic and for basic security monitoring. Repeat visits
              from the same browser within a short window are not reported again.
            </p>
            <p>We do not take payments through this website.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              2. How we use your information
            </h2>
            <p>
              We use your information to reply to your enquiry and to discuss flexible contract
              work, a software or AI project, technical support, AI training or a partnership.
              Before we agree to any work, we will discuss scope, responsibilities and timing with you.
              Visitor IP and location details may be emailed to {COMPANY.email} for traffic awareness
              and basic security monitoring.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              3. How messages are sent and stored
            </h2>
            <p>
              Contact form messages and visitor alerts are sent by email through Web3Forms, a
              third-party form email service, and delivered to our inbox at {COMPANY.email}. We keep
              enquiry emails for as long as needed to respond to you and manage any resulting work,
              and then delete them. [Confirm retention period.]
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              4. Cookies, analytics and local storage
            </h2>
            <p>
              This website does not use advertising cookies. It stores your light or dark theme
              preference in your browser&rsquo;s local storage so the site remembers your choice. For
              visitor reporting we may set a short-lived cookie (about 30 seconds) so the same visit
              is not reported repeatedly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              5. Third-party services
            </h2>
            <p>The website relies on the following third-party services:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="text-foreground">Web3Forms</span> to deliver contact form messages
                and visitor alerts to {COMPANY.email}.
              </li>
              <li>
                <span className="text-foreground">ipapi.is</span> to look up approximate location and
                network details for visitor IP addresses.
              </li>
              <li>
                <span className="text-foreground">Google Fonts</span> to load the website&rsquo;s
                typefaces. Your browser contacts Google when fonts are loaded.
              </li>
              <li>
                <span className="text-foreground">Our website hosting provider</span>, which may keep
                standard server logs such as IP address and request time. [Confirm hosting provider.]
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">6. Your rights</h2>
            <p>
              You can ask us to see the personal information we hold about you, correct it, or delete
              it. To make a request, email us at {COMPANY.email}. We will respond within a reasonable
              time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">7. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top
              of this page shows when it last changed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">8. Contact us</h2>
            <p>
              Questions about this policy? Email {COMPANY.email} or{" "}
              <Link href="/#contact" className="text-primary hover:underline">
                use the contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
