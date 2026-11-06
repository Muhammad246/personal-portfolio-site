import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} · Built with care.</span>
        <Link href="#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
