export const siteConfig = {
  name: "Muhammad Ali",
  description:
    "Portfolio of a BS Computer Science student at PAF-KIET focused on data analytics, AI engineering, and backend systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""),
  email: "mohammadalisyed37@gmail.com",
  githubUrl: "https://github.com/Muhammad246",
  linkedinUrl: "https://www.linkedin.com/in/m-ali-data/",
};

export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
