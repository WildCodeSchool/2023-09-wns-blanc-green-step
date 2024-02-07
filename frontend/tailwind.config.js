/** @type {import('tailwindcss').Config} */
const colors = {
  gray: {
    1: "#0A0A0A",
    10: "#1F1F1F",
    20: "#3D3D3D",
    30: "#474747",
    40: "#666666",
    50: "#999999",
    60: "#A3A3A3",
    70: "#C2C2C2",
    80: "#D6D6D6",
    90: "#EBEBEB",
    100: "#F5F5F5",
  },
  green: {
    10: "#5BC27C",
    20: "#6AC888",
    30: "#79CD94",
    40: "#88D3A0",
    50: "#97D8AC",
    60: "#B5E3C3",
    70: "#C3E9CF",
    80: "#D2EEDB",
    90: "#D2EEDB",
    100: "#E1F4E7",
  },
  blue: {
    1: "#3E878E",
    10: "#4BA2AA",
    20: "#53ABB3",
    30: "#63B3BB",
    40: "#7FC1C7",
    50: "#8EC8CD",
    60: "#AAD6DA",
    70: "#B8DDE0",
    80: "#C6E3E6",
    90: "#D4EAEC",
    100: "#E3F1F3",
  },
  orange: {
    90: "F9D9C8",
    100: "FDF2ED",
  },
};

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },
    colors: {
      ...colors,
      primary: colors["green"],
      secondary: colors["blue"],
      thirdly: colors["orange"],
    },
    extend: {
      width: {
        dashcontent: "calc(100vw - 24rem)",
      },
    },
  },
  plugins: [],
};
