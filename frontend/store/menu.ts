import type { TPortalMenu } from '@/api/menu';
import type { TMenu } from '@/constants/types/menu';
import * as path from '@/routes/path';

export const useMenuStore = defineStore('menu', () => {
  // 현재 선택된 메뉴
  const currentMenu = ref<TMenu | null>(null);

  const menuList = MENU_LIST;

  // 메뉴의 계층 정보를 리스트에서 찾아 배열로 반환 [증부모, 부모, 메뉴]
  const getMenuHierarchy = (menu?: TMenu, list?: TMenu[] | TPortalMenu[]) => {
    const findMenu = menu || currentMenu.value;
    const findList = list || menuList;

    const findHierarchy = (findList: TMenu[] | TPortalMenu[]): TMenu[] | undefined => {
      for (const menu of findList) {
        // 현재 메뉴를 찾은 경우
        if (menu.id === findMenu?.id) return [menu];

        // 자식 메뉴가 존재할 경우 재귀 탐색
        if (menu?.children?.length) {
          const result = findHierarchy(menu?.children || []);
          if (result?.length) return [...result, menu];
        }
      }
    };

    // 루트 → 현재 메뉴 순으로 정렬하여 반환
    return findHierarchy(findList)?.reverse();
  };

  // 특정 메뉴가 현재 선택된 메뉴이거나 자식으로 포함되어 있는지 여부 반환
  const hasMenuOrChildSelected = (menu: TMenu): boolean => {
    const match = (target: TMenu): boolean => {
      if (target.name === currentMenu.value?.name) return true;
      if (target.children?.length) {
        return target.children.some((child) => match(child));
      }
      return false;
    };
    return match(menu);
  };

  // key와 value로 메뉴를 찾아 반환
  const findMenuByKey = (key: string, value: string): TMenu | undefined => {
    const search = (menus: TMenu[]): TMenu | undefined => {
      for (const menu of menus) {
        // 해당 키 값이 일치하는 메뉴를 찾은 경우
        if (menu[key as keyof TMenu] === value) return menu;

        // 자식이 있다면 재귀 탐색
        if (menu.children) {
          const result = search(menu.children);
          if (result) return result;
        }
      }
    };
    return search(menuList);
  };

  // 현재 메뉴 설정
  const selectMenu = (menu: TMenu) => {
    currentMenu.value = { ...menu };
  };

  // 현재 URL을 기준으로 메뉴 선택
  const selectMenuByUrl = (url: string) => {
    const ignorePages = [path.PATH_MAIN, '/auth-fail', '/404'];

    if (ignorePages.includes(url)) {
      currentMenu.value = null;
      return;
    }

    const exactMatch = () => findMenuByKey('url', url);

    const partialMatch = () => {
      let partialUrl = url;
      while (partialUrl) {
        const lastSlashIndex = partialUrl.lastIndexOf('/');
        if (lastSlashIndex <= 0) break;
        partialUrl = partialUrl.substring(0, lastSlashIndex);
        const menu = findMenuByKey('url', partialUrl);
        if (menu) return menu;
      }
    };

    const matchedMenu = exactMatch() || partialMatch();

    if (!matchedMenu) {
      navigateTo('/404');
      return;
    }

    selectMenu(matchedMenu);
  };

  const getLeafMenuList = (menuList: TPortalMenu[]): TMenu[] => {
    const leafMenuList: TMenu[] = [];

    const traverse = (menus: (TMenu | TPortalMenu)[]) => {
      for (const menu of menus) {
        if (menu.children && menu.children.length > 0) {
          traverse(menu.children);
        } else {
          leafMenuList.push(menu);
        }
      }
    };

    traverse(menuList);
    return leafMenuList;
  };

  return {
    menuList,
    currentMenu,
    findMenuByKey,
    selectMenu,
    selectMenuByUrl,
    hasMenuOrChildSelected,
    getMenuHierarchy,
    getLeafMenuList,
  };
});

export const MENU_LIST: TMenu[] = [
  {
    id: 'menu',
    name: '메뉴 관리',
    icon: 'mdi-alpha-m-box-outline',
    children: [
      {
        id: 'tab-menu',
        name: '탭 메뉴',
        url: path.PATH_MENU_TAB_MENU,
      },
    ],
  },
  {
    id: 'iframe-info',
    name: 'Iframe 정보 관리',
    icon: 'mdi-sitemap',
    url: path.PATH_IFRAME_INFO,
  },
  {
    id: 'widget-map',
    name: '위젯, 지도 관리',
    icon: 'mdi-map',
    url: path.PATH_QUERY,
  },
  {
    id: 'post',
    name: '게시물 관리',
    icon: 'mdi-post',
    children: [
      {
        id: 'notice',
        name: '공지사항',
        url: path.PATH_POST_NOTICE,
      },
      {
        id: 'popup',
        name: '팝업',
        url: path.PATH_POST_POPUP,
      },
      {
        id: 'report',
        name: '통계',
        url: path.PATH_POST_REPORT,
      },
    ],
  },
];
