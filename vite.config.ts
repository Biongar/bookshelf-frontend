import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

const apiUrl = {
  stage: 'https://vinauto-test.urs.su',
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve' && mode !== 'staging') {
    // команда npm run dev
    return {
      plugins: [vue(), eslintPlugin()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      css: { preprocessorOptions: { scss: { charset: false } } },
    }
  } else if (command === 'serve' && mode === 'staging') {
    // команда npm run dev-staging
    return {
      server: {
        proxy: {
          '/api': {
            target: apiUrl.stage,
            changeOrigin: true,
            secure: true,
          },
        },
      },
      plugins: [vue(), eslintPlugin()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      css: { preprocessorOptions: { scss: { charset: false } } },
    }
  } else if (mode === 'staging') {
    // команда npm run build-staging
    return {
      server: {
        proxy: {
          '/api': {
            target: apiUrl.stage,
            changeOrigin: true,
            secure: true,
          },
        },
      },
      plugins: [vue(), eslintPlugin()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      css: { preprocessorOptions: { scss: { charset: false } } },
      build: {
        outDir: './dist-staging',
      },
    }
  } else {
    // команда npm run build
    return {
      plugins: [vue(), eslintPlugin()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      css: { preprocessorOptions: { scss: { charset: false } } },
      build: {
        outDir: './dist',
      },
    }
  }
})
