import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

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
export const postData = (
  url: string,
  data: any,
  config: AxiosRequestConfig,
  success: (res: AxiosResponse<any, any>) => void,
  fail: (err?: AxiosError) => void
) => {
  (async () => {
    try {
      const res = await axios.post(url, data, config);
      success(res);
    } catch (err: any) {
      fail(err);
    }
  })();
};
export const patchData = (
  url: string,
  data: any,
  config: AxiosRequestConfig,
  success: (res: AxiosResponse<any, any>) => void,
  fail: (err?: AxiosError) => void
) => {
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
