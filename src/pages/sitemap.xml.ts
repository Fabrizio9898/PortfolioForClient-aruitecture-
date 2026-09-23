import type { APIRoute } from "astro";
import { absoluteUrl } from "../config/site";
import { getProjects } from "../data/projects";

export const GET: APIRoute = async () => {
  const projects = await getProjects();
  const urls = ["/", ...projects.map(({ slug }) => `/${slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${absoluteUrl(url)}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
