const path = require("path");

module.exports = {
  content: [path.join(__dirname, "./src/**/*.{js,ts,jsx,tsx}")],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        twitter: "#1DA1F2",
        github: "#000",
      },
      aspectRatio: {
        gold: "1 / 1.618",
      },
      boxShadow: {
        menu: "0px 0px 10px 5px rgb(0 0 0 / 0.1), 0 5px 7px -4px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [require("daisyui")],
};
