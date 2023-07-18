import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestType } from '../types/utilTypes';

export const getData = (
  url: string,
  success: (res: AxiosResponse) => void,
  fail: (err?: AxiosError) => void,
  config?: AxiosRequestConfig
) => {
  (async () => {
    try {
      const res: AxiosResponse = await axios(url, config);
      success(res);
    } catch (err) {
      err instanceof AxiosError && fail(err);
    }
  })();
};
export const postData: RequestType = (url, data, config, success, fail) => {
  (async () => {
    try {
      const res: AxiosResponse = await axios.post(url, data, config);
      success(res);
    } catch (err) {
      err instanceof AxiosError && fail(err);
    }
  })();
};
export const patchData: RequestType = (url, data, config, success, fail) => {
  (async () => {
    try {
      const res: AxiosResponse = await axios.patch(url, data, config);
      success(res);
    } catch (err) {
      err instanceof AxiosError && fail(err);
    }
  })();
};

export const deleteData = (
  url: string,
  config: AxiosRequestConfig,
  success: (res: AxiosResponse) => void,
  fail: (err?: AxiosError) => void
) => {
  (async () => {
    try {
      const res: AxiosResponse = await axios.delete(url, config);
      success(res);
    } catch (err) {
      err instanceof AxiosError && fail(err);
    }
  })();
};
