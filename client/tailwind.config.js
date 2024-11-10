/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  plugins: [require("tailwind-scrollbar"), require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0d9488",
          secondary: "#64748b",
          accent: "#22d3ee",
          neutral: "#3d4451",
          "base-100": "#ffffff", // Background color
        },
      },
    ],
  },
};
