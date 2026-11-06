import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Muhammad Ali | Data, AI & Backend Engineering",
    template: "%s | Muhammad Ali",
  },
  description: siteConfig.description,
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  openGraph: {
    title: "Muhammad Ali | Data, AI & Backend Engineering",
    description: siteConfig.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#111310" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
