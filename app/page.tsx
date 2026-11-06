import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ContactSection } from "@/components/contact-section";
import { SocialLinks } from "@/components/social-links";
import { projects, skills } from "@/lib/projects";

export default function HomePage() {
  return (
    <main id="main">
      <section className="shell hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Data · AI · Backend</p>
          <h1 id="hero-title">Turning data into <span className="accent-text">useful intelligence.</span></h1>
          <p className="hero-description">
            I’m a Computer Science student at PAF-KIET exploring the intersection of data analytics,
            AI engineering, and backend development.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></Link>
            <a className="button button-secondary" href="/Ali_Analyst_Resume.pdf" download="Muhammad_Ali_Resume.pdf">
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>
          <SocialLinks />
        </div>
        <div className="hero-aside" aria-label="Areas of interest">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-core"><span>AI</span><span>×</span><span>Data</span></div>
          <span className="orbit-label orbit-label-top">Build with intent</span>
          <span className="orbit-label orbit-label-bottom">Learn by shipping</span>
          <span className="orbit-node node-one" />
          <span className="orbit-node node-two" />
          <span className="orbit-node node-three" />
        </div>
        <div className="hero-meta"><span>Karachi, Pakistan</span><span>CS · PAF-KIET</span></div>
      </section>

      <section className="section shell" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div><h2 id="work-title">Projects<span className="accent-text">.</span></h2></div>
          <p className="section-note">A collection across AI, analytics, and applied machine learning.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section className="section section-tinted" id="about" aria-labelledby="about-title">
        <div className="shell about-grid">
          <div className="about-intro">
            <p className="eyebrow">A little about me</p>
            <h2 id="about-title">Curious by nature.<br /><span className="accent-text">Practical by design.</span></h2>
          </div>
          <div className="about-detail">
            <p className="about-copy">
              I’m pursuing a BS in Computer Science at PAF-KIET and building my foundation through
              hands-on work in analytics, sales, AI-powered applications, and backend systems.
              I enjoy taking a question from raw data to a useful, well-built solution.
            </p>
            <div className="skills-grid">
              {skills.map((group) => (
                <div className="skill-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
