import type { MenuType, ServiceType, YN } from '@/constants/enums/common';

export type TPortalMenu = {
  id: string;
  pid: string;
  service: ServiceType;
  seq: number;
  type: MenuType;
  name: string;
  visible: boolean;
  breadcrumbVisible: boolean;
  shortContent: boolean;
  url: string;
  icon: string;
  access: boolean;
  description: string;
  children: TPortalMenu[];
};

export type TPortalMenuParams = {
  menuId?: string;
  depth?: number;
  service: ServiceType;
};

// export type TTabMenuParams = {
//   showYn: YN[];
// };
