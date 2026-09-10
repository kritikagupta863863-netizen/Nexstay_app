import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary": "#ffffff",
        "on-primary-fixed-variant": "#3f465c",
        "tertiary-fixed-dim": "#b7c8e1",
        "surface": "#f7f9fb",
        "on-secondary-container": "#fefcff",
        "on-tertiary-fixed": "#0b1c30",
        "inverse-on-surface": "#eff1f3",
        "surface-container-high": "#e6e8ea",
        "on-error": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-container": "#75859d",
        "surface-container-low": "#f2f4f6",
        "on-primary-container": "#7c839b",
        "on-tertiary": "#ffffff",
        "outline-variant": "#c6c6cd",
        "on-secondary-fixed": "#001a42",
        "tertiary-container": "#0b1c30",
        "primary-container": "#131b2e",
        "tertiary-fixed": "#d3e4fe",
        "primary-fixed": "#dae2fd",
        "secondary-container": "#2170e4",
        "on-error-container": "#93000a",
        "inverse-surface": "#2d3133",
        "surface-container": "#eceef0",
        "on-primary": "#ffffff",
        "on-surface-variant": "#45464d",
        "background": "#f7f9fb",
        "surface-variant": "#e0e3e5",
        "secondary-fixed-dim": "#adc6ff",
        "on-primary-fixed": "#131b2e",
        "secondary": "#0058be",
        "on-surface": "#191c1e",
        "primary": "#000000",
        "inverse-primary": "#bec6e0",
        "on-background": "#191c1e",
        "primary-fixed-dim": "#bec6e0",
        "surface-tint": "#565e74",
        "secondary-fixed": "#d8e2ff",
        "tertiary": "#000000",
        "surface-bright": "#f7f9fb",
        "surface-dim": "#d8dadc",
        "on-tertiary-fixed-variant": "#38485d",
        "surface-container-highest": "#e0e3e5",
        "on-secondary-fixed-variant": "#004395",
        "error": "#ba1a1a",
        "outline": "#76777d",
        "error-container": "#ffdad6"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      fontFamily: {
        headline: ["Hanken Grotesk", "sans-serif"],
        display: ["Hanken Grotesk", "sans-serif"],
        body: ["Hanken Grotesk", "sans-serif"],
        label: ["JetBrains Mono", "monospace"]
      }
    },
  },
  plugins: [],
};

export default config;
