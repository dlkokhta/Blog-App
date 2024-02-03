/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 

  theme: {
    extend: {
      colors: {
        purple: "#5D37F3",
        white: "#FFFFFF",
        white2: "#F3F2FA",
        white3: "#FCFCFD",
        green: "#B7E5B4",
        pink: "#FFA447",  
        yellow: "#FFD447",
        blue: "#7BD3EA",
        yellowOpacity: "#FFB82F",
        greenOpacity: "#1CD67D",
        purpleOpacity: "#B11CD6",
        redOpracity: "#FA5757",
        greenOpacity2: "#70CF25",
        greenOpacity3: "#08D2AE",
        yellowCategory: "#D6961C",
        greenCategory: "#15C972",
        purpleCategory: "#B71FDD",
        redCategory: "#DC2828",
        greenCategory2: "#60BE16",
        greenCategory3: "#1AC7A8",
        grey: "#85858D",
        lightGray: "#E4E3EB",
        green1: "#14D81C",
        lightGreen: "#F8FFF8",
        lightRed: "#FAF2F3",
        grey2:"#85858D"
        

        
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

