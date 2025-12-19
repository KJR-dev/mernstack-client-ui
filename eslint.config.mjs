import { defineConfig } from "eslint";
import next from "eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
    ],
    languageOptions: {
      parser,
      ecmaVersion: 2024,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint,
      next,
      prettier,
    },
    extends: [
      "next/core-web-vitals",
    ],
    rules: {
      "prettier/prettier": ["error", { semi: true }],
    },
  },
]);
