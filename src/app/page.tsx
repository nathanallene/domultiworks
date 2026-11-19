import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { OurApproach } from "@/components/home/OurApproach";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        <WhatWeDo />
        <ServicesOverview />
        <OurApproach />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
