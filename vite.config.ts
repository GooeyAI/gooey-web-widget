
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { peerDependencies } from "./package.json";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const baseConfig = {
    define: { "process.env": {} },
    resolve: {
      alias: {
        src: resolve(__dirname, "src"),
      },
    },
    plugins: [
      react(),
    ],
  };

  // === PACKAGE BUILD (for publishing components) ===
  if (mode === "components") {
    return {
      ...baseConfig,
      plugins: [
        ...baseConfig.plugins,
        dts({
          insertTypesEntry: true,
          include: ["src/components/**/*.ts", "src/components/**/*.tsx"],
        }),
        cssInjectedByJsPlugin(),
      ],
      build: {
        cssCodeSplit: false,
        copyPublicDir: false,
        outDir: "components-dist",
        lib: {
          entry: "./src/components/index.ts",
          name: "gooey-web-widget",
          fileName: (format) => `gooey-chat-components.${format}.js`,
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            manualChunks: undefined,
          },
        },
        commonjsOptions: {
          transformMixedEsModules: true,
        },
        emptyOutDir: true,
      },
    };
  }

  // === DEFAULT WIDGET BUILD (standalone IIFE for embed) ===
  return {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      sentryVitePlugin({
        org: "dara-network",
        project: "copilot-web-widget",
        authToken: env.SENTRY_AUTH_TOKEN,
      }),
    ],
    build: {
      lib: {
        entry: "./src/lib.tsx",
        name: "gooey-chat",
        fileName: (format) => `index.${format}.js`,
        formats: ["iife"],
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        external: [...Object.keys(peerDependencies)],
        preserveEntrySignatures: "strict",
        output: {
          manualChunks: undefined,
          extend: true,
          globals: {
            react: "React",
          },
          inlineDynamicImports: true,
          entryFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
      emptyOutDir: true,
      sourcemap: true,
    },
  };
});
