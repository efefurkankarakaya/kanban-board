import type { Config } from "tailwindcss";
import { TaskColor } from "./data/tasks";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      fontSize: {
        xxs: "0.65rem"
      },
      colors: {
        "task-list": "#262626",
        "task-pink": "#c340a1",
        "task-blue": "#6b6dcd",
        "task-red": "#d93535",
        "task-green": "#05a88b",
        "task-purple": "#a020f0",
        "task-orange": "#ffa500",
        "task-powder": "#ac8181"
      }
    }
  },
  safelist: Object.values(TaskColor).map((item) => item), // To be able to use dynamic Task colors in Task component
  plugins: []
};
export default config;
