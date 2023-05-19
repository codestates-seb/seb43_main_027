import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { getData } from '../api/apiCollection';
import { useDispatch } from 'react-redux';
import { setUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';

export const useCheckAuth = (navigateTo: string) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const onSuccess = (res: AxiosResponse) => {
    dispatch(setUser(res.data.data));
  };

  const onFail = () => {
    navigation(navigateTo);
  };

  useEffect(() => {
    getData(`${process.env.REACT_APP_API_URL}/api/profile`, onSuccess, onFail, {
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    });
  }, []);
};
