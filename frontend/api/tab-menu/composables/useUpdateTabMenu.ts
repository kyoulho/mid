import { updateTabMenu } from '../api';
import type { TTabMenu, TTabMenuBody } from '../types';

export const useUpdateTabMenu = (tabId: string, body: TTabMenuBody): Promise<TTabMenu> => {
  return updateTabMenu(tabId, body);
};
