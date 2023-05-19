import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../slice/userSlice';
import { RootState } from '../store/store';
import styled from 'styled-components';

import LogInFieldsContainer from '../components/Login/LoginFieldsContainer';
import LogInTopWrapper from '../components/Login/LoginTopWrapper';
import LogInOauthContainer from '../components/Login/LoginOauthContainer';
import LogInButtonsContainer from '../components/Login/LoginButtonsContainer';

const LogIn = () => {
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const userinfo = useSelector((state: RootState) => state.user);
  const logininfo = useSelector((state: RootState) => state.signup);

  const oauthLogIn: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    const googleAuthUrl = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/login`;
    window.location.href = googleAuthUrl;
  };

  const emailLogIn: React.MouseEventHandler = async (e: React.MouseEvent) => {
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
          localStorage.setItem('user', JSON.stringify(userdata));
          console.log(JSON.parse(localStorage.getItem('user')!));
          alert('you successfully logged in!');
          navigation('/');
        });
    } catch (error) {
      console.log(error);
      alert('you failed to login!');
      navigation('/error');
    }
  };

  useEffect(() => {
    if (userinfo.memberId !== -1) {
      navigation('/');
      console.log('working?');
    }
    console.log('working');
  }, [userinfo]);

  return (
    <StyledLogInContainer>
      <StyledLogInFormWrapper>
        {/* top - component */}
        <LogInTopWrapper />
        {/* Form - component */}
        <StyledLogInFormContainer>
          {/* Oauth - component */}
          <LogInOauthContainer onClick={oauthLogIn} />
          {/* Input - components */}
          <LogInFieldsContainer />
          {/* Button - components */}
          <LogInButtonsContainer onClick={emailLogIn} />
        </StyledLogInFormContainer>
      </StyledLogInFormWrapper>
    </StyledLogInContainer>
  );
};

export default LogIn;

const StyledLogInContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const StyledLogInFormWrapper = styled.div`
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

const StyledLogInFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 650px) {
    width: 80%;
  }
`;
