import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { glslify } from "vite-plugin-glslify";
import glslifyRollup from "rollup-plugin-glslify";

const glslifyOptions = {
  extensions: ["vs", "fs", ".glsl", ".frag.shader"],
  compress: true,
  transform: ["glslify-import"],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glslify(glslifyOptions), glslifyRollup(glslifyOptions)],
});
