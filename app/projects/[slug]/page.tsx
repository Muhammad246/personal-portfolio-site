import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectActions } from "@/components/project-actions";
import { projects } from "@/lib/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: `${project.title} — a ${project.category.toLowerCase()} portfolio project.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main id="main" className="project-detail shell">
      <Link className="back-link" href="/#work">← Back to selected work</Link>
      <p className="eyebrow">{project.number} / {project.category}</p>
      <h1>{project.title}<span className="accent-text">.</span></h1>
      <p className="detail-intro">Project notes and implementation details will be added here.</p>
      <ProjectActions project={project} />
      <div className="detail-placeholder">
        <p>This page is ready for a project summary, the tools used, and links to the source or demo.</p>
        <p>No project outcomes or technical details have been added yet.</p>
      </div>
      <Link className="text-link" href="/#work">View all projects <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
