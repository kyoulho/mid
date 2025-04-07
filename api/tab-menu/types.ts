import type { YN } from '@/constants/enums/common';
import type { TPortalMenu } from '../menu';

type TTabMenuCommon = {
  seq: number;
  title: string;
  iframeUrl?: string;
  srcPath?: string;
  visibleYn: YN;
  attributes: Record<string, string>;
};

export type TTabMenu = TTabMenuCommon & {
  id: string;
  menu: Omit<TPortalMenu, 'children'>;
};

export type TTabMenuParams = {
  menuId?: string;
};

export type TTabMenuBody = TTabMenuCommon & {
  menuId: string;
};
