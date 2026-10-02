import type { Project } from "../../types/project";

export function getProjectTypes(projects: Project[]) {
  const seen = new Map<string, string>();

  for (const p of projects) {
    if (p.projectType && !seen.has(p.projectType.slug)) {
      seen.set(p.projectType.slug, p.projectType.title);
    }
  }

  return [...seen].map(([slug, title]) => ({ title, slug }));
}
