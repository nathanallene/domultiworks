import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { SiteBackground } from "@/components/ui/SiteBackground";
import { COMPANY } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const siteTitle = `${COMPANY.name} | ${COMPANY.tagline}`;

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.metaDescription,
  keywords: [
    "Software Contracts",
    "Flexible Contracts for Developers",
    "Multiple Contracts",
    "Custom AI Development",
    "Software Development",
    "Technical Support",
    "Free AI Training",
    "Beginner AI Training",
  ],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    title: siteTitle,
    description: COMPANY.metaDescription,
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: COMPANY.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SiteBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
