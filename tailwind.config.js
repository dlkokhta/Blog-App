/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},

  theme: {
    extend: {
      colors: {
        purple: "#5D37F3",
        white: "#FFFFFF",
        white2: "#F3F2FA",
        green: "#B7E5B4",
        pink: "#FFA447",  
        yellow: "#FFD447",
        blue: "#7BD3EA"
        
      },
    },

    // theme: {
    //   extend: {
    //     animation: {
    //       spin: "spin 10000s linear",
    //     },
    //     keyframes: {
    //       "spin-x": {
    //         "0%": { transform: "rotateY(90deg)" },
    //         "100%": { transform: "rotateY(90deg)" },
    //       },
    //     },
    //   },
    // },
    fontFamily: {
      atkinsonHyperlegible: ["Atkinson Hyperlegible", "sans-serif"],
    },
    // fontSize: {
    //   "3.2xl": "32px",
    // },
    screens: {
      sm: "378px",
      // => @media (min-width: 640px) { ... }

      md: "540px",
      // => @media (min-width: 768px) { ... }

      lg: "768px",
      // => @media (min-width: 1024px) { ... }

      xl: "1440px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },

  plugins: [],
};
