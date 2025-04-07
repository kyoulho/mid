import type { TAsyncData } from '@/constants/types/api';
import { fetchTabMenu } from '../api';
import { TAB_MENU_LIST_KEY } from '../key';
import type { TTabMenu, TTabMenuParams } from '../types';
import type { AsyncDataOptions } from 'nuxt/app';

type TUseTabMenuReturn<T extends boolean | undefined> = T extends true
  ? Promise<TTabMenu[]>
  : TAsyncData<TTabMenu[]>;

export function useTabMenu<T extends boolean | undefined = undefined>(
  params: TTabMenuParams,
  useClientFetch?: T,
  options?: AsyncDataOptions<TTabMenu[]>,
): TUseTabMenuReturn<T> {
  return (
    useClientFetch
      ? fetchTabMenu(params)
      : useAsyncData<TTabMenu[]>(TAB_MENU_LIST_KEY, () => fetchTabMenu(params), options)
  ) as TUseTabMenuReturn<T>;
}
