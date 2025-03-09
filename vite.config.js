import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/dist',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        page2: './index3.html',
        labList: './lab_result.html',
        profile: './profile.html',
        youPartners: './your_partners.html',
      }
    }
  }
});
