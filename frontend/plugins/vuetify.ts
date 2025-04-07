import { createVuetify, type ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import '@mdi/font/css/materialdesignicons.css';
import * as directives from 'vuetify/directives';

const LightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#1677ff',
    lightPrimary: '#e6f4ff',
    secondary: '#8c8c8c',
    lightSecondary: '#f5f5f5',
    success: '#52c41a',
    accent: '#ffab91',
    info: '#16c2c3',
    warning: '#faad14',
    error: '#ff4d4f',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: LightTheme,
        variables: {},
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
