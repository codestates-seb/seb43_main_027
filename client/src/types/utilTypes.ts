import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type validationType =
  | 'username'
  | 'email'
  | 'password'
  | 'custom'
  | 'none';

export type RequestType = (
  url: string,
  data: any,
  config: AxiosRequestConfig,
  success: (res: AxiosResponse<any, any>) => void,
  fail: (err?: AxiosError) => void
) => void;
