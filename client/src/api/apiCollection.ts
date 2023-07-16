import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestType } from '../types/utilTypes';

export const getData = (
  url: string,
  success: (res: AxiosResponse<any, any>) => void,
  fail: (err?: AxiosError) => void,
  config?: AxiosRequestConfig
) => {
  (async () => {
    try {
      const res = await axios(url, config);
      success(res);
    } catch (err: any) {
      fail(err);
    }
  })();
};
export const postData: RequestType = (url, data, config, success, fail) => {
  (async () => {
    try {
      const res = await axios.post(url, data, config);
      success(res);
    } catch (err: any) {
      fail(err);
    }
  })();
};
export const patchData: RequestType = (url, data, config, success, fail) => {
  (async () => {
    try {
      const res = await axios.patch(url, data, config);
      success(res);
    } catch (err: any) {
      fail(err);
    }
  })();
};

export const deleteData = (
  url: string,
  config: AxiosRequestConfig,
  success: (res: AxiosResponse<any, any>) => void,
  fail: (err?: AxiosError) => void
) => {
  (async () => {
    try {
      const res = await axios.delete(url, config);
      success(res);
    } catch (err: any) {
      fail(err);
    }
  })();
};
