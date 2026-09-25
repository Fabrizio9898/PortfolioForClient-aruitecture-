export interface MediaSource {
  src: string;
  width: number;
}

export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  sources?: MediaSource[];
}

export interface ProjectMedia extends Media {
  id: string;
}

export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  // Identidad
  id: string;
  slug: string;
  title: string;

  // Contenido
  description: string;
  content?: string[];

  // Información del proyecto
  year?: number;
  location?: string;
  status?: ProjectStatus;
  client?: string;
  projectType?: string;
  featured?: boolean;

  // Superficies
  siteArea?: string;
  builtArea?: string;

  // Media

  coverImageId: string;
  images: ProjectMedia[];
}
