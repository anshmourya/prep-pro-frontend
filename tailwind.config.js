/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: "true",
      screens: {
        "2xl": "1600px",
      },
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        tablet: "975px",
        desktop: "1125px",
        // Max-width variants
        "max-2xl": { max: "1536px" },
        "max-xl": { max: "1280px" },
        "max-lg": { max: "1024px" },
        "max-md": { max: "768px" },
        "max-sm": { max: "640px" },
        "max-tablet": { max: "975px" },
        "max-desktop": { max: "1125px" },
        mq1125: {
          raw: "screen and (max-width: 1125px)",
        },
        // mq1024: {
        // 	raw: 'screen and (max-width: 1024px'
        // },
        mq1000: {
          raw: "screen and (max-width: 1000px)",
        },
        mq975: {
          raw: "screen and (max-width: 975px)",
        },
        mq900: {
          raw: "screen and (max-width: 900px)",
        },
        mq825: {
          raw: "screen and (max-width: 825px)",
        },
        mq750: {
          raw: "screen and (max-width: 750px)",
        },
        mq725: {
          raw: "screen and (max-width: 725px)",
        },
        mq700: {
          raw: "screen and (max-width: 700px)",
        },
        mq675: {
          raw: "screen and (max-width: 675px)",
        },
        mq450: {
          raw: "screen and (max-width: 450px)",
        },
      },
      colors: {}
    },
  },
  plugins: [require("tailwindcss-animate")],
}

