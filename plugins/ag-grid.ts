import { defineNuxtPlugin } from 'nuxt/app';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default defineNuxtPlugin(() => {});
