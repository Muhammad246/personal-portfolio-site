import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label={`${siteConfig.name} home`}>
          <span>{siteConfig.name}<span className="wordmark-period">.</span></span>
        </Link>
        <nav aria-label="Main navigation" className="main-nav">
          {navigation.map((item) => (
            <Link href={item.href} key={item.label}>{item.label}</Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
