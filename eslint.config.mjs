import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    files: ["app/case-studies/page.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": "off",
      "react/jsx-no-target-blank": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  globalIgnores([".next/**", "node_modules/**", "out/**", "public/**"]),
]);
