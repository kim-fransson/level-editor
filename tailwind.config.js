import reactAriaComponents from "tailwindcss-react-aria-components";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssGridAreas from "@savvywombat/tailwindcss-grid-areas";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#CAC8C8",
        "dark-gray": "#212121",
        gray: "#393939",
        "light-gray": "#9D9D9D",
        "light-blue": "#528EFF",
        red: "#FF7878",
        blue: "#2867DD",
      },
      opacity: {
        87: 0.87,
      },
      gridTemplateAreas: {
        layout: ["tiles toolbar", "tiles content", "tiles footer"],
      },
      gridTemplateColumns: {
        layout: "8rem 1fr",
        15: "repeat(15, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        layout: "3.25rem 1fr 2rem",
      },
    },
  },
  plugins: [
    reactAriaComponents,
    daisyui,
    tailwindcssAnimate,
    // https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227#issuecomment-1139895799
    ({ addUtilities }) => {
      addUtilities({});
    },
    tailwindcssGridAreas,
  ],
};
