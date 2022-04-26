const path = require("path");

module.exports = {
  content: [path.join(__dirname, "./src/**/*.{js,ts,jsx,tsx}")],
  mode: "jit",
  theme: {
    extend: {
      aspectRatio: {
        gold: "1 / 1.618",
      },
    },
  },
  plugins: [require("daisyui")],
};
