import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getData = (
  url: string,
  success: (res: AxiosResponse<any, any>) => void,
  fail: () => void,
  config?: AxiosRequestConfig
) => {
  (async () => {
    try {
      const res = await axios(url, config);
      success(res);
    } catch (err: any) {
      if (err.response.status === 404) {
        alert('해당경로가 존재하지 않습니다.');
      }
      fail();
    }
  })();
};
export const postData = (
  url: string,
  data: any,
  config: AxiosRequestConfig,
  success: (res: AxiosResponse<any, any>) => void,
  fail: () => void
) => {
  (async () => {
    try {
      const res = await axios.post(url, data, config);
      success(res);
    } catch (err: any) {
      if (err.response.status === 404) {
        alert('해당경로가 존재하지 않습니다.');
      }
      fail();
    }
  })();
};
export const patchData = (
  url: string,
  data: any,
  config: AxiosRequestConfig,
  success: (res: AxiosResponse<any, any>) => void,
  fail: () => void
) => {
  (async () => {
    try {
      const res = await axios.patch(url, data, config);
      success(res);
    } catch (err: any) {
      if (err.response.status === 404) {
        alert('해당경로가 존재하지 않습니다.');
      }
      fail();
    }
  })();
};

export const deleteData = (
  url: string,
  config: AxiosRequestConfig,
  success: (res: AxiosResponse<any, any>) => void,
  fail: () => void
) => {
  (async () => {
    try {
      const res = await axios.delete(url, config);
      success(res);
    } catch (err: any) {
      if (err.response.status === 404) {
        alert('해당경로가 존재하지 않습니다.');
      }
      fail();
    }
  })();
};
