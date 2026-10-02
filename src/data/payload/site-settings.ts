const API_URL = import.meta.env.PAYLOAD_API_URL ?? "http://localhost:3000";

interface PayloadSiteSettings {
  email?: string;
  whatsapp?: string;
  whatsappText?: string;
  socials?: { id: string; label: string; url: string }[];
}

export interface SiteSettings {
  email?: string;
  whatsappUrl?: string;
  socials: { label: string; url: string }[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await fetch(`${API_URL}/api/globals/site-settings`);

  if (!res.ok) {
    throw new Error(`Error obteniendo ajustes del sitio: ${res.status}`);
  }

  const data: PayloadSiteSettings = await res.json();

  const whatsappUrl = data.whatsapp
    ? `https://wa.me/${data.whatsapp}${
        data.whatsappText
          ? `?text=${encodeURIComponent(data.whatsappText)}`
          : ""
      }`
    : undefined;

  return {
    email: data.email,
    whatsappUrl,
    socials: (data.socials ?? []).map((s) => ({ label: s.label, url: s.url })),
  };
}
