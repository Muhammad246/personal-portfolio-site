import { siteConfig } from "@/lib/site";

export function SocialLinks() {
  const links = [
    { label: "GitHub", href: siteConfig.githubUrl },
    { label: "LinkedIn", href: siteConfig.linkedinUrl },
  ].filter((link) => link.href);

  if (links.length === 0) return null;

  return (
    <div className="social-links">
      {links.map((link) => (
        <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
