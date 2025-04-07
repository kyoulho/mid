import type { TAsyncData } from '@/constants/types/api';
import { fetchPortalMenu } from '../api';
import { PORTAL_MENU_KEY } from '../key';
import type { TPortalMenu, TPortalMenuParams } from '../types';

export const usePortalMenu = (
  params: Omit<TPortalMenuParams, 'service'>,
): TAsyncData<TPortalMenu[]> => {
  return useAsyncData(PORTAL_MENU_KEY, () => fetchPortalMenu(params));
};
