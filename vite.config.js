import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import importMapPlugin from "@eik/rollup-plugin";
import { viteMockServe } from "vite-plugin-mock";


const reactUrl =
  "https://asset-bucket-proxy.dev.intern.nav.no/asset/react/v/17.0.2/index.esm.js";
const reactDomUrl =
  "https://asset-bucket-proxy.dev.intern.nav.no/asset/react-dom/v/17.0.2/index.esm.js";

  export default ({ command }) => ({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
    }),
    {
      ...importMapPlugin({
        maps: [
          {
            imports: {
              react: reactUrl,
              "react-dom": reactDomUrl,
            },
          },
        ],
      }),
      enforce: 'pre',
      apply: 'build'
    },
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: "src/renderApp.jsx",
      output: {
        manualChunks: false,
        entryFileNames: `bundle.js`,
        chunkFileNames: `bundle.js`,
        assetFileNames: `bundle.[ext]`,
      },
    },
  },
  test: {
    global: true,
    environment: "jsdom",
    deps: {
      inline: ["@testing-library/user-event"],
    },
  }
});
