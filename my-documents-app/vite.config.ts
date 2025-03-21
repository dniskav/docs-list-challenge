import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    port: 3000,
    open: true
  },
  plugins: [],
  css: {
    modules: {
      scopeBehaviour: 'local'
    }
  }
})
