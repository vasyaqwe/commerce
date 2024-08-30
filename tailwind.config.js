/** @type {import('tailwindcss').Config} */

const color = (cssVar) => `hsl(var(--${cssVar}) / <alpha-value>)`

module.exports = {
   darkMode: "class",
   content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
   theme: {
      container: {
         center: true,
         padding: "0.9rem",
         screens: {
            sm: "100%",
            md: "100%",
            lg: "1024px",
            xl: "1324px",
            "2xl": "1324px",
         },
      },
      extend: {
         fontFamily: {
            primary: ["var(--font-geist-sans)"],
         },
         keyframes: {
            shimmer: {
               "100%": {
                  transform: "translateX(100%)",
               },
            },
            "caret-blink": {
               "0%,70%,100%": { opacity: "1" },
               "20%,50%": { opacity: "0" },
            },
            "fade-in": {
               from: { opacity: "0" },
               to: { opacity: "1" },
            },
         },
         animation: {
            "caret-blink": "caret-blink 1.25s ease-out infinite",
            "fade-in":
               "fade-in 450ms var(--animation-delay, 0ms) ease forwards",
            carousel: "marquee 60s linear infinite",
         },
         gridTemplateColumns: {
            fluid: "repeat(auto-fit, minmax(var(--fluid-width, 6.5rem), 1fr))",
            fixed: "repeat(auto-fill, minmax(6.5rem, 1fr))",
         },
         transitionTimingFunction: {
            smoothing: "cubic-bezier(0.32, 0.73, 0, 1)",
         },
         colors: {
            brand: color("brand"),
            border: color("border"),
            background: color("background"),
            foreground: color("foreground"),
            popover: {
               DEFAULT: color("popover"),
               foreground: color("popover-foreground"),
               highlight: color("popover-highlight"),
            },
            primary: {
               DEFAULT: color("primary"),
               foreground: color("primary-foreground"),
            },
            destructive: {
               DEFAULT: color("destructive"),
               foreground: color("destructive-foreground"),
            },
            muted: {
               DEFAULT: color("muted"),
               foreground: color("muted-foreground"),
            },
            accent: color("accent"),
            ring: color("ring"),
         },
         fontSize: {
            base: "0.91rem",
            lg: "1.125rem",
         },
         boxShadow: {
            "popover-shadow": "var(--popover-shadow)",
            "popover-side-shadow": "var(--popover-side-shadow)",
         },
      },
   },
   plugins: [
      require("@tailwindcss/typography"),
      require("tailwindcss-animate"),
   ],
}
