import hero01 from "../assets/hero/proyecto-04.jpg";
import hero02 from "../assets/hero/proyecto-02.jpg";
import hero03 from "../assets/hero/proyecto-03.jpg";
import hero04 from "../assets/hero/proyecto-01.jpg";
import hero05 from "../assets/hero/proyecto-05.jpg";
import hero06 from "../assets/hero/proyecto-06.jpg";
import hero07 from "../assets/hero/proyecto-07.jpg";

export const heroSlots = [
  {
    first: {
      type: "text",
      lines: ["Federico", "Dávalos"],
    },
    second: {
      type: "image",
      image: hero01,
    },
  },

  {
    first: {
      type: "image",
      image: hero02,
    },
    second: {
      type: "image",
      image: hero03,
    },
  },

  {
    first: {
      type: "image",
      image: hero04,
    },
    second: {
      type: "image",
      image: hero05,
    },
  },

  {
    first: {
      type: "image",
      image: hero06,
    },
    second: {
      type: "image",
      image: hero07,
    },
  },
] as const;