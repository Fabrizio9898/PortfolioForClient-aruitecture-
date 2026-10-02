export interface About {
  bio: string[];
  instagram?: string;
  email?: string;
}

const PAYLOAD_URL = import.meta.env.PAYLOAD_API_URL;

export async function getAbout(): Promise<About> {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/about`);
  const data = await res.json();

  return {
    bio: (data.bio ?? []).map((b: { paragraph: string }) => b.paragraph),
    instagram: data.instagram || undefined,
    email: data.email || undefined,
  };
}


const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const renderBold = (text: string) =>
  escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");