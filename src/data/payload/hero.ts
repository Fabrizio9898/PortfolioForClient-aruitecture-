const API_URL = import.meta.env.PAYLOAD_API_URL ?? "http://localhost:3000";

interface PayloadHero {
  nameLine1: string;
  nameLine2: string;
  images: {
    image: { url: string; alt: string; width: number; height: number };
  }[];
}

export interface HeroSlot {
  first:
    | { type: "text"; lines: string[] }
    | { type: "image"; src: string; alt: string };
  second: { type: "image"; src: string; alt: string };
}

export async function getHero(): Promise<HeroSlot[]> {
  const res = await fetch(`${API_URL}/api/globals/hero`);
  const data: PayloadHero = await res.json();

  const slots: HeroSlot[] = [];

  // Slot 0: texto + primera imagen
  slots.push({
    first: { type: "text", lines: [data.nameLine1, data.nameLine2] },
    second: {
      type: "image",
      src: data.images[0].image.url,
      alt: data.images[0].image.alt,
    },
  });

  // Slots 1-3: imágenes restantes (2 por slot)
  for (let i = 1; i < 7; i += 2) {
    slots.push({
      first: {
        type: "image",
        src: data.images[i].image.url,
        alt: data.images[i].image.alt,
      },
      second: {
        type: "image",
        src: data.images[i + 1].image.url,
        alt: data.images[i + 1].image.alt,
      },
    });
  }

  return slots;
}
