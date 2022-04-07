module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      aspectRatio: {
        card: "400 / 650",
      },
    },
  },
  plugins: [require("daisyui")],
};
