import type { Project, ProjectMedia } from "../../types/project";

const API_URL = import.meta.env.PAYLOAD_API_URL ?? "http://localhost:3000";

interface PayloadProject {
  id: string;
  slug: string;
  title: string;
  description: string;

  content?: { paragraph: string }[];

  year: number;
  location: string;
  status: "completed" | "in-progress";

  client?: string;

  projectType: {
    id: number;
    title: string;
    slug: string;
  };

  specialties?: {
    id: number;
    title: string;
    slug: string;
  }[];

  featured: boolean;

  siteArea?: string;
  builtArea?: string;

  images: {
    id: string;
    image: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };

    caption?: string | null;
  }[];
}

interface PayloadProjectsResponse {
  docs: PayloadProject[];
}

function mapProject(p: PayloadProject): Project {
  const images = p.images.map((img) => ({
    id: img.id,
    src: `${API_URL}${img.image.url}`,
    alt: img.image.alt ?? "",
    width: img.image.width ?? 0,
    height: img.image.height ?? 0,
    caption: img.caption ?? undefined,
  }));

  if (images.length === 0) {
    throw new Error(`El proyecto "${p.title}" no tiene imágenes.`);
  }

  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,

    description: p.description,

    content: p.content?.map((item) => item.paragraph),

    year: p.year,
    location: p.location,
    status: p.status,

    client: p.client,

    projectType: p.projectType
      ? { title: p.projectType.title, slug: p.projectType.slug }
      : undefined,

    specialties: (p.specialties ?? []).map((s) => ({
      title: s.title,
      slug: s.slug,
    })),

    featured: p.featured,

    siteArea: p.siteArea,
    builtArea: p.builtArea,

    coverImageId: images[0].id,

    images,
  };
}


export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects?depth=1&limit=100`);

  if (!res.ok) {
    throw new Error(`Error obteniendo proyectos desde Payload: ${res.status}`);
  }

  const data: PayloadProjectsResponse = await res.json();

  return data.docs.map(mapProject);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const res = await fetch(
    `${API_URL}/api/projects?depth=1&where[slug][equals]=${encodeURIComponent(slug)}`,
  );

  if (!res.ok) {
    throw new Error(
      `Error obteniendo el proyecto "${slug}" desde Payload: ${res.status}`,
    );
  }

  const data: PayloadProjectsResponse = await res.json();

  return data.docs[0] ? mapProject(data.docs[0]) : undefined;
}
