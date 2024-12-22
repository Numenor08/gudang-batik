import path from "path"
import { fileURLToPath } from 'url'
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shadcn": path.resolve(__dirname, "./src/components/ui"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@management": path.resolve(__dirname, "./src/pages/management"),
      "@skeleton": path.resolve(__dirname, "./src/components/skeleton"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
})