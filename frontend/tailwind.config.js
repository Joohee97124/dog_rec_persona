// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "grid-cols-3",
    "grid-cols-4",
    "md:grid-cols-3",
    "md:grid-cols-4",
  ],
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "float-delay": "float 3s ease-in-out 1.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(-10deg)" },
          "50%": { transform: "translateY(-15px) rotate(10deg)" },
        },
      },
    },
  },
};
