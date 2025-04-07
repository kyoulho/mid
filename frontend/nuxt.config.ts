import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'nuxt-svgo',
    'dayjs-nuxt',
    '@nuxt/eslint',
    'pinia-plugin-persistedstate/nuxt',
  ],
  css: ['vuetify/styles', '@/styles/ui/index.scss'],
  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker'],
  },
  components: {
    dirs: [
      {
        path: '@/components',
        pathPrefix: false,
      },
    ],
  },
  vite: {
    plugins: [
      vueJsx(),
      svgLoader({
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            'removeDimensions',
          ],
        },
      }),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/utils/index.scss" as *;',
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  dayjs: {
    locales: ['ko', 'en'],
    plugins: ['timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul',
  },
  eslint: {
    config: {},
  },
  svgo: {
    autoImportPath: '@/assets/images/icon/',
    componentPrefix: 'svgo',
  },
  runtimeConfig: {
    authSecret: '',
    keycloakClientId: '',
    keycloakClientSecret: '',
    keycloakIssuer: '',
    springApiBaseUrl: '',
  },
});
