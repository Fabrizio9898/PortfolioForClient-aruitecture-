import type { Project } from "../types/project";
const projects = [
  {
    id: "project-001",
    slug: "courtyard-house",
    title: "Courtyard House",
    description:
      "A compact residential study organized around a sheltered central courtyard, bringing daylight and planted space into the heart of the plan.",
    year: 2025,
    location: "Buenos Aires, Argentina",
    status: "Concept",
    client: "Private client",
    projectType: "Residential",
    siteArea: "480 m²",
    builtArea: "210 m²",
    coverImage: {
      src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85",
      alt: "Contemporary residential architecture",
      width: 2000,
      height: 1333,
      caption: "Courtyard House",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85",
        alt: "Contemporary residential architecture",
        width: 2000,
        height: 1333,
        caption: "Exterior",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85",
        alt: "Minimal interior with natural materials",
        width: 2000,
        height: 1333,
        caption: "Interior",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
        alt: "Modern house surrounded by vegetation",
        width: 2000,
        height: 1333,
        caption: "Garden elevation",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
        alt: "Minimal residential interior",
        width: 2000,
        height: 1333,
        caption: "Living space",
      },
    ],
  },
  {
    id: "project-002",
    slug: "coastal-pavilion",
    title: "Coastal Pavilion",
    description:
      "A lightweight pavilion that frames long views while creating shade and a protected place to gather near the water.",
    year: 2024,
    location: "Mar del Plata, Argentina",
    status: "Competition",
    projectType: "Civic",
    siteArea: "1,200 m²",
    builtArea: "340 m²",
    coverImage: {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85",
      alt: "Contemporary architectural pavilion",
      width: 2000,
      height: 1333,
      caption: "Coastal Pavilion",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85",
        alt: "Contemporary architectural pavilion",
        width: 2000,
        height: 1333,
        caption: "Main pavilion",
      },
      {
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85",
        alt: "Open contemporary architectural interior",
        width: 2000,
        height: 1333,
        caption: "Interior space",
      },
      {
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=85",
        alt: "Minimal contemporary building exterior",
        width: 2000,
        height: 1333,
        caption: "Approach",
      },
    ],
  },
  {
    id: "project-003",
    slug: "forest-house",
    title: "Forest House",
    description:
      "A residential project conceived as a sequence of quiet spaces opening toward the surrounding landscape.",
    year: 2023,
    location: "Patagonia, Argentina",
    status: "Built",
    client: "Private client",
    projectType: "Residential",
    siteArea: "2,400 m²",
    builtArea: "280 m²",
    coverImage: {
      src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2000&q=85",
      alt: "Contemporary house integrated into the landscape",
      width: 2000,
      height: 1333,
      caption: "Forest House",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2000&q=85",
        alt: "Contemporary house integrated into the landscape",
        width: 2000,
        height: 1333,
        caption: "Exterior",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85",
        alt: "Warm minimal residential interior",
        width: 2000,
        height: 1333,
        caption: "Living room",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=85",
        alt: "Contemporary interior with large openings",
        width: 2000,
        height: 1333,
        caption: "Interior",
      },
    ],
  },
] satisfies Project[];
export async function getProjects(): Promise<Project[]> {
  return projects;
}
export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}
