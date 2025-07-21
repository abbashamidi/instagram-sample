/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 👈 فعال‌سازی حالت تاریک با استفاده از کلاس `dark`
  theme: {
    extend: {
      colors: {
        // 🎨 می‌تونی رنگ‌های سفارشی‌ت رو اینجا اضافه کنی
        darkBg: "#121212",
        darkSurface: "#1f1f1f",
        darkBorder: "#333",
      },
    },
  },
  plugins: [],
};
