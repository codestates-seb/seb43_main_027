import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setUser } from '../../slice/userSlice';

const GoogleLogIn = () => {
  const navigator = useNavigate();

  const dispatch = useDispatch();

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!localStorage.getItem('accessToken')) {
      const param = url.searchParams.get('token');
      if (param) {
        console.log(`this is param: ${param}`);
        setAccessToken(param);
      }
    } else {
      console.log('there is access token in localStorage');
      setAccessToken(localStorage.getItem('accessToken')!);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) {
      const actoken = localStorage.getItem('access_token');
      if (actoken) {
        setAccessToken(actoken);
        console.log(`This is actoken: ${actoken}`);
      }
    }
    if (accessToken) {
      localStorage.setItem('access_token', `Bearer ${accessToken}`);
      console.log(`This is local access_token: ${accessToken}`);
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      try {
        axios(`${process.env.REACT_APP_API_URL}/api/members/profile`, {
          headers
        }).then((response) => {
          const userdata = response.data;
          dispatch(setUser({ ...userdata }));
          localStorage.setItem('user', JSON.stringify(userdata));
          console.log(JSON.parse(localStorage.getItem('user')!));
          alert('you successfully logged in!');
          navigator('/');
        });
      } catch (error) {
        console.log(error);
        alert('you failed to login!');
        navigator('/error');
      }
    }
  }, [accessToken]);

  return (
    <>
      <Loading />
    </>
  );
};

export default GoogleLogIn;
