import type { TAsyncData, TFetchOptions } from '@/constants/types/api';
import { getTabMenu } from '../api';
import { TAB_MENU_KEY } from '../key';
import type { TTabMenu } from '../types';
import type { AsyncDataOptions } from 'nuxt/app';

export const useGetTabMenu = (
  tabId: string,
  options?: AsyncDataOptions<TTabMenu>,
  fetchOptions?: TFetchOptions,
): TAsyncData<TTabMenu> => {
  return useAsyncData<TTabMenu>(
    `${TAB_MENU_KEY}-${tabId}`,
    () => getTabMenu(tabId, fetchOptions),
    options,
  );
};
