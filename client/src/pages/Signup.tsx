import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import SignupFieldsContainer from '../components/Signup/SignupFieldsContainer';
import SignupTopWrapper from '../components/Signup/SignupTopWrapper';
import SignupOauthContainer from '../components/Signup/SignupOauthContainer';
import SignupButtonsContainer from '../components/Signup/SignupButtonsContainer';
import SignupModal from '../components/Signup/SignupModal';
import SignupFailModal from '../components/Signup/SignupFailModal';
import SignupErrorModal from '../components/Signup/SignupErrorModal';

import oauthSignup from '../utils/OauthSignUpFunction';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        .then(() => {
          setIsOpen(true);
        });
    } catch (error) {
      if (error.response && error.response.status === 409) {
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
    navigation('/login');
  };
  const modalCloseFail = () => {
    navigation(-1);
  };
  const modalCloseError = () => {
    navigation('/error');
  };

  return (
    <StyledSignupContainer>
      <SignupModal
        isOpen={isOpen}
        confirmMessage={'저희의 친구가 되주셔서 감사합니다!'}
        closeHandler={modalClose}
      />
      <SignupFailModal
        isOpen={isOpen}
        confirmMessage={'이미 사용중인 닉네임,또는 아이디입니다.'}
        closeHandler={modalCloseFail}
      />
      <SignupErrorModal
        isOpen={isOpen}
        confirmMessage={'알 수 없는 오류가 발생했습니다.'}
        closeHandler={modalCloseError}
      />
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
