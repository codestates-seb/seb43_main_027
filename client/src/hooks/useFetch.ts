import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (url: string, init = [], deps = []) => {
  const [data, setData] = useState(init);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios(url);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [...deps]);

  return [data, setData];
};
