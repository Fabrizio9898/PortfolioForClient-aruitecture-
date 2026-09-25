import type { Project } from "../types/project";

export function getProjectCover(project: Project) {
  return project.images.find((image) => image.id === project.coverImageId);
}
