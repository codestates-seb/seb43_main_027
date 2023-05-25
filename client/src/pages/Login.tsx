import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../slice/userSlice';
import { RootState } from '../store/store';
import styled from 'styled-components';

import LoginFieldsContainer from '../components/Login/LoginFieldsContainer';
import LoginTopWrapper from '../components/Login/LoginTopWrapper';
import LoginOauthContainer from '../components/Login/LoginOauthContainer';
import LoginButtonsContainer from '../components/Login/LoginButtonsContainer';
import LoginModal from '../components/Login/LoginModal';
import LoginFailModal from '../components/Login/LoginFailModal';
import LoginErrorModal from '../components/Login/LoginErrorModal';

import oauthLogin from '../utils/OauthSignUpFunction';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const userinfo = useSelector((state: RootState) => state.user);
  const logininfo = useSelector((state: RootState) => state.signup);

  const emailLogin: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          email: logininfo.email,
          password: logininfo.password
        })
        .then((response) => {
          localStorage.setItem('access_token', response.headers.authorization);
          localStorage.setItem('refresh_token', response.headers.refresh);
          const userdata = response.data;
          dispatch(setUser({ ...userdata }));
          setIsOpen(true);
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsOpen(true);
      } else {
        setIsOpen(true);
      }
    }
  };

  useEffect(() => {
    if (userinfo.memberId !== -1) {
      navigation('/');
      console.log('working?');
    }
    console.log('working');
  }, [userinfo]);

  const modalClose = () => {
    navigation('/');
  };
  const modalCloseFail = () => {
    navigation(-1);
  };
  const modalCloseError = () => {
    navigation('/error');
  };

  return (
    <StyledLoginContainer>
      <LoginModal
        isOpen={isOpen}
        confirmMessage={'저희의 친구가 되주셔서 감사합니다!'}
        closeHandler={modalClose}
      />
      <LoginFailModal
        isOpen={isOpen}
        confirmMessage={'아이디 또는 비밀번호가 일치하지 않습니다.'}
        closeHandler={modalCloseFail}
      />
      <LoginErrorModal
        isOpen={isOpen}
        confirmMessage={'알 수 없는 오류가 발생했습니다.'}
        closeHandler={modalCloseError}
      />
      <StyledLoginFormWrapper>
        {/* top - component */}
        <LoginTopWrapper />
        {/* Form - component */}
        <StyledLoginFormContainer>
          {/* Oauth - component */}
          <LoginOauthContainer onClick={oauthLogin} />
          {/* input - components */}
          <LoginFieldsContainer />
          {/* Button - components */}
          <LoginButtonsContainer onClick={emailLogin} />
        </StyledLoginFormContainer>
      </StyledLoginFormWrapper>
    </StyledLoginContainer>
  );
};

export default Login;

const StyledLoginContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const StyledLoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 1.6rem;
    margin: 0.3rem;
    white-space: nowrap;
  }
`;

const StyledLoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 650px) {
    width: 80%;
  }
`;
