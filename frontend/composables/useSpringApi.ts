import type { AvailableRouterMethod } from 'nitropack';
import type { TFetchOptions, TSpringResponse, TSpringErrorResponse } from '@/constants/types/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TRequestData = Record<string, any> | undefined;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TSpringApi<TQuery extends TRequestData, TBody extends TRequestData, TRes> = {
  url: string;
  method: Uppercase<AvailableRouterMethod<string>>;
  query?: TQuery;
  body?: TBody;
  fetchOptions?: TFetchOptions;
};

export const useSpringApi = async <TQuery extends TRequestData, TBody extends TRequestData, TRes>({
  url,
  method,
  query,
  body,
  fetchOptions,
}: TSpringApi<TQuery, TBody, TRes>): Promise<TRes> => {
  const targetUrl = '/spring' + url;
  const { headers, ...restFetchOptions } = fetchOptions || {};

  const { getSession, signOut } = useAuth();
  const session = await getSession();
  const accessToken = session?.accessToken;

  try {
    const { data } = await $fetch<TSpringResponse<TRes>>(targetUrl, {
      method,
      query,
      body,
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...headers,
      },
      ...restFetchOptions,
    });
    return data;
  } catch (error) {
    const errorData = (error as { data: TSpringErrorResponse }).data;

    if (errorData.statusCode === 401) signOut();

    throw createError({
      statusCode: errorData.statusCode,
      statusMessage: errorData.errorMessage,
    });
  }
};
