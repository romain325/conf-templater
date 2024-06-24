import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/conf-templater.ts"],
  publicDir: false,
  clean: true,
  minify: true,
  format: ["cjs"],
});
