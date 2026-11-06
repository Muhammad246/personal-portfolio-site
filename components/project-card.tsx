import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectActions } from "@/components/project-actions";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <span className="project-number">{project.number}</span>
      <Link className="project-card-main" href={`/projects/${project.slug}`}>
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <span className="project-arrow" aria-hidden="true">↗</span>
      </Link>
      <ProjectActions project={project} />
    </article>
  );
}
