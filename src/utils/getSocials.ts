import { getSiteSettings } from "../data/payload/site-settings";

export const settings = await getSiteSettings();

export const socials = [
  ...settings.socials.map((s) => ({
    label: s.label,
    href: s.url,
    external: true,
  })),
  ...(settings.email
    ? [{ label: "Email", href: `mailto:${settings.email}`, external: false }]
    : []),
];
