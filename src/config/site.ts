export const site = {
  url: new URL(import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:4321"),
  title: "Architecture Portfolio",
  description: "Selected architectural projects and practice information.",
  architect: {
    // Add verified identity and contact details here before launch.
    name: undefined as string | undefined,
    location: undefined as string | undefined,
    email: undefined as string | undefined,
  },
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).href;
}
