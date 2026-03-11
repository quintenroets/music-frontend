const { resolve } = require("path");
module.exports = {
  content: [resolve(__dirname, "../src/**/*.vue")],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
