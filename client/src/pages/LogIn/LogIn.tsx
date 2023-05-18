import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../slice/userSlice';
import { RootState } from '../../store/store';
import styled from 'styled-components';

import LogInFieldsContainer from './LogInFieldsContainer';
import LogInTopWrapper from './LogInTopWrapper';
import LogInOauthContainer from './LogInOauthContainer';
import LogInButtonsContainer from './LogInButtonsContainer';

const LogIn = () => {
  const navigator = useNavigate();

  const dispatch = useDispatch();
  const logininfo = useSelector((state: RootState) => state.signup);

  const oauthLogIn: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    // 유효성 검사 들어갈 자리
    const googleAuthUrl = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/login`;
    window.location.href = googleAuthUrl;
  };

  const emailLogIn: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    // 유효성 검사 들어갈 자리
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
          navigator('/');
        });
    } catch (error) {
      console.log(error);
      alert('you failed to login!');
      navigator('/error');
    }
  };

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
