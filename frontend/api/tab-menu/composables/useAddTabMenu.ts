import { addTabMenu } from '../api';
import type { TTabMenu, TTabMenuBody } from '../types';

export const useAddTabMenu = (body: TTabMenuBody): Promise<TTabMenu> => {
  return addTabMenu(body);
};
