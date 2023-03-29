import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        /* 
    to comply with the same-origin policy during
    development, proxy API requests at frontend
    */
        proxy: {
            "/api/conversation": {
                target: "https://ora.sh/",
                changeOrigin: true,
            },
        },
    },
});
