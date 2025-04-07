import { Method, ServiceType } from '@/constants/enums/common';
import type { TPortalMenuParams, TPortalMenu } from './types';

export const fetchPortalMenu = (
  params: Omit<TPortalMenuParams, 'service'>,
): Promise<TPortalMenu[]> => {
  return useSpringApi<TPortalMenuParams, undefined, TPortalMenu[]>({
    url: '/api/menu',
    method: Method.Get,
    query: {
      ...params,
      service: ServiceType.Public,
    },
  });
};
