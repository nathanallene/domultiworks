import Image from "next/image";
import backgroundImage from "@/photos/background/site-background.webp";

/*
 * Full-page background picture. It stays fixed behind every section while scrolling.
 * The picture is dark, so it is only shown in dark mode (the site's default theme).
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="object-cover"
      />
    </div>
  );
}
