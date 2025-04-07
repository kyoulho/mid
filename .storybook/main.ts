import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  previewHead: (head) => `
    ${head}
    <script
      type="text/javascript"
      src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NAVER_KEY_ID}"
    ></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  `,
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: async (config) => {
    return {
      ...config,
      plugins: [...(config.plugins || []), vue(), vueJsx()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../'),
          '~': path.resolve(__dirname, '../'),
        },
      },
    };
  },
};
export default config;
