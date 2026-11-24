import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminho relativo: o mesmo build funciona no GitHub Pages (/gabbe_st/) e na raiz do host do cliente.
  base: './',
  plugins: [react()],
})
