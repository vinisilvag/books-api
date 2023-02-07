import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    setupFiles: ['/tests/vitest.setup.ts']
  },
  plugins: [tsconfigPaths()]
})
