import type { AvailableRouterMethod, NitroFetchOptions } from 'nitropack';
import type { AsyncData, NuxtError } from 'nuxt/app';

export type TFetchOptions = Omit<
  NitroFetchOptions<string, AvailableRouterMethod<string>>,
  'params' | 'query' | 'body' | 'method'
>;

export type TAsyncData<T> = AsyncData<T | null, NuxtError<unknown> | null>;

export type TApiResponse<T> = {
  result: 'SUCCESS' | 'ERROR';
  statusCode: number;
  errorMessage: string;
  data: T | null;
};

export type TSpringResponse<T> = {
  result: 'SUCCESS';
  statusCode: number;
  errorMessage: string;
  data: T;
};

export type TSpringErrorResponse = {
  result: 'ERROR';
  statusCode: number;
  errorMessage: string;
  data: null;
};
