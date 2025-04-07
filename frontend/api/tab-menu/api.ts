import type { TFetchOptions } from '@/constants/types/api';
import { Method } from '@/constants/enums/common';
import type { TTabMenu, TTabMenuBody, TTabMenuParams } from './types';

export const fetchTabMenu = (params: TTabMenuParams): Promise<TTabMenu[]> => {
  return useSpringApi<TTabMenuParams, undefined, TTabMenu[]>({
    url: '/api/tab-menus',
    method: Method.Get,
    query: params,
  });
};

export const getTabMenu = (tabId: string, fetchOptions?: TFetchOptions): Promise<TTabMenu> => {
  return useSpringApi<undefined, undefined, TTabMenu>({
    url: `/api/tab-menus/${tabId}`,
    method: Method.Get,
    fetchOptions,
  });
};

export const addTabMenu = (body: TTabMenuBody): Promise<TTabMenu> => {
  return useSpringApi<undefined, TTabMenuBody, TTabMenu>({
    url: `/api/tab-menus`,
    method: Method.Post,
    body,
  });
};

export const updateTabMenu = (tabId: string, body: TTabMenuBody): Promise<TTabMenu> => {
  return useSpringApi<undefined, TTabMenuBody, TTabMenu>({
    url: `/api/tab-menus/${tabId}`,
    method: Method.Put,
    body,
  });
};

export const deleteTabMenu = (tabId: string): Promise<undefined> => {
  return useSpringApi({
    url: `/api/tab-menus/${tabId}`,
    method: Method.Delete,
  });
};
