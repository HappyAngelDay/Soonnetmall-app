import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/soonnetmall-app/' // GitHub Pages 子路徑，根據你 repo 名改
})
