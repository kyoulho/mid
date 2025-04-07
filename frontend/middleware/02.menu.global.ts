import { useMenuStore } from '@/store/menu';

export default defineNuxtRouteMiddleware((to) => {
  const store = useMenuStore();
  store.selectMenuByUrl(to.path);
});
