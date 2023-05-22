import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { getData } from '../api/apiCollection';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

export const useCheckAuth = (navigateTo: string) => {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.user);
  const navigation = useNavigate();

  const onSuccess = (res: AxiosResponse) => {
    dispatch(setUser(res.data.data));
  };

  const onFail = () => {
    navigation(navigateTo);
  };

  useEffect(() => {
    if (localStorage.getItem('access_token') && user.memberId === -1) {
      getData(
        `${process.env.REACT_APP_API_URL}/api/members/profile`,
        onSuccess,
        onFail,
        {
          headers: {
            Authorization: localStorage.getItem('access_token')
          }
        }
      );
    }
  }, []);
};
