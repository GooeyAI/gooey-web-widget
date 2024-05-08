import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { peerDependencies } from "./package.json";

const env = loadEnv("dev", process.cwd(), "");
export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: "./src/lib.tsx", // Specifies the entry point for building the library.
      name: "gooey-chat", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["iife"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
      preserveEntrySignatures: "strict",
      output: {
        manualChunks: undefined,
        extend: true,
        globals: {
          react: "React",
        },
        inlineDynamicImports: true,
        entryFileNames: "[name].js", // currently does not work for the legacy bundle
        assetFileNames: "[name].[ext]", // currently does not work for images
      },
    },
    // sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
  },
  define: {
    "process.env": env,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
  plugins: [react()], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
});
