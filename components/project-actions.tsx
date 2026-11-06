import type { Project } from "@/lib/projects";

export function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="project-actions" aria-label={`${project.title} links`}>
      <a className="project-action" href={project.githubUrl} target="_blank" rel="noreferrer">
        GitHub <span aria-hidden="true">↗</span>
      </a>
      {project.demoUrl ? (
        <a className="project-action project-action-demo" href={project.demoUrl} target="_blank" rel="noreferrer">
          Live demo <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}
