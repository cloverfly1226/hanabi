import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
    server: {
        open: true,
        host: true,
        port: 4869,
    },
    plugins: [glsl()],
    base: "./",
});
