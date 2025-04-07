import type { TPortalMenu } from '@/api/menu';
import type { TTabMenu } from '@/api/tab-menu';
import { YN } from '@/constants/enums/common';
import { PATH_MENU_TAB_MENU_DETAIL } from '@/routes/path';
import { useMenuStore } from '@/store/menu';
import type { ColDef, ICellRendererParams, ValueGetterParams } from 'ag-grid-community';

export const columns = (portalMenuList: TPortalMenu[]): ColDef<TTabMenu>[] => [
  {
    headerName: '타이틀',
    field: 'title',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return `<a href="${PATH_MENU_TAB_MENU_DETAIL(data?.id)}" class="link">${data?.title}</a>`;
    },
  },
  {
    headerName: '메뉴',
    valueGetter: ({ data }: ValueGetterParams<TTabMenu>) => {
      const { getMenuHierarchy } = useMenuStore();
      const menu = getMenuHierarchy(data?.menu, portalMenuList);

      return menu?.map(({ name }) => name).join(' > ');
    },
    flex: 1.5,
  },
  {
    headerName: '순서',
    field: 'seq',
    flex: 0.5,
  },
  {
    headerName: '외부 페이지',
    valueGetter: ({ data }: ValueGetterParams<TTabMenu>) =>
      data?.iframeUrl ? data?.iframeUrl : '-',
  },
  {
    headerName: '내부 경로',
    valueGetter: ({ data }: ValueGetterParams<TTabMenu>) => (data?.srcPath ? data?.srcPath : '-'),
  },
  {
    headerName: '공개 여부',
    valueGetter: ({ data }: ValueGetterParams<TTabMenu>) =>
      data?.visibleYn === YN.Y ? '공개' : '비공개',
    flex: 0.5,
  },
];
