import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Troque 'volei-vnl' pelo NOME EXATO do seu repositório
export default defineConfig({
  plugins: [react()],
  base: '/volei-vnl/',
})
