import { absoluteUrl, site } from "../config/site";
import type { Project } from "../types/project";
import { getProjectCover } from "./projects";

type JsonLd = Record<string, unknown>;

export function websiteJsonLd(): JsonLd[] {
  const graph: JsonLd[] = [
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: site.url.href,
      name: site.title,
      description: site.description,
    },
  ];

  if (site.architect.name) {
    graph.push({
      "@type": "Person",
      "@id": absoluteUrl("/#architect"),
      name: site.architect.name,
      jobTitle: "Architect",
      url: site.url.href,
      ...(site.architect.location
        ? {
            homeLocation: {
              "@type": "Place",
              name: site.architect.location,
            },
          }
        : {}),
    });
  }

  return graph;
}

export function projectJsonLd(project: Project): JsonLd {
  const cover = getProjectCover(project);

  return {
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/${project.slug}/#project`),
    url: absoluteUrl(`/${project.slug}/`),
    name: project.title,
    description: project.description,

    ...(project.year ? { dateCreated: String(project.year) } : {}),

    ...(project.location
      ? {
          contentLocation: {
            "@type": "Place",
            name: project.location,
          },
        }
      : {}),

    ...(cover ? { image: absoluteUrl(cover.src) } : {}),

    ...(site.architect.name
      ? {
          creator: {
            "@id": absoluteUrl("/#architect"),
          },
        }
      : {}),
  };
}
