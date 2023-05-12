import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useInput from '../../hooks/useInput';

import styled from 'styled-components';

import LogInFieldsContainer from './LogInFieldsContainer';
import LogInTopWrapper from './LogInTopWrapper';
import LogInOauthContainer from './LogInOauthContainer';
import LogInButtonsContainer from './LogInButtonsContainer';

const LogIn = () => {
  const navigator = useNavigate();

  const [emailProps, setEmail] = useInput('', 'email');
  const [passWordProps, setPassWord] = useInput('', 'password');

  const [usernameValid, setUserNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passWordValid, setPassWordValid] = useState(true);

  const oauthLogIn: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    // 유효성 검사 들어갈 자리
    const googleAuthUrl = `${process.env.REACT_APP_SERVER}/oauth2/authorization/google?redirect_uri=http://localhost:3000/login`;
    window.location.href = googleAuthUrl;
  };

  const emailLogIn: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    // 유효성 검사 들어갈 자리
    try {
      await axios
        .post(
          'http://ec2-13-209-70-188.ap-northeast-2.compute.amazonaws.com:8080/api/members/login',
          {
            email: emailProps.value,
            password: passWordProps.value
          }
        )
        .then((response) => {
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
          <LogInFieldsContainer
            inputEmail={emailProps}
            inputPassWord={passWordProps}
          />
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
