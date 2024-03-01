import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { JWT_Url } from "./src/API-Token-Data.js";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
});
