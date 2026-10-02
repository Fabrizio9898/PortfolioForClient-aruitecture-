import type { Project } from "../../types/project";

export function getSpecialties(projects: Project[]) {
  const seen = new Map<string, string>();

  for (const p of projects) {
    for (const s of p.specialties) {
      if (!seen.has(s.slug)) seen.set(s.slug, s.title);
    }
  }

  return [...seen].map(([slug, title]) => ({ title, slug }));
}
