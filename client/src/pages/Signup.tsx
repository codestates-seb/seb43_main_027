import { useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import SignupFieldsContainer from '../components/Signup/SignupFieldsContainer';
import SignupTopWrapper from '../components/Signup/SignupTopWrapper';
import SignupOauthContainer from '../components/Signup/SignupOauthContainer';
import SignupButtonsContainer from '../components/Signup/SignupButtonsContainer';

import oauthSignup from '../utils/OauthSignUpFunction';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Signup = () => {
  const navigation = useNavigate();

  const userinfo = useSelector((state: RootState) => state.user);
  const signupinfo = useSelector((state: RootState) => state.signup);

  const emailSignup: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/members/signup`, {
          username: signupinfo.username,
          email: signupinfo.email,
          password: signupinfo.password
        })
        .then((response) => {
          alert('you successfully signed up!');
          navigation('/login');
        });
    } catch (error) {
      console.log(error);
      alert('you failed to signup!');
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
    <StyledSignupContainer>
      <StyledSignupFormWrapper>
        {/* top - component */}
        <SignupTopWrapper />
        {/* Form - component */}
        <StyledSignupFormContainer>
          {/* Oauth - component */}
          <SignupOauthContainer onClick={oauthSignup} />
          {/* Input - components */}
          <SignupFieldsContainer />
          {/* Button - components */}
          <SignupButtonsContainer onClick={emailSignup} />
        </StyledSignupFormContainer>
      </StyledSignupFormWrapper>
    </StyledSignupContainer>
  );
};

export default Signup;

const StyledSignupContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const StyledSignupFormWrapper = styled.div`
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

const StyledSignupFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 650px) {
    width: 80%;
  }
`;
