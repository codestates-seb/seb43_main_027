import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import SignUpFieldsContainer from './SignUpFieldsContainer';
import SignUpTopWrapper from './SignUpTopWrapper';
import SignUpOauthContainer from './SignUpOauthContainer';
import SignUpButtonsContainer from './SignUpButtonsContainer';

import oauthSignUp from '../../utils/OauthSignUpFunction';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const SignUp = () => {
  const navigation = useNavigate();

  const signupinfo = useSelector((state: RootState) => state.signup);

  const emailSignUp: React.MouseEventHandler = async (e: React.MouseEvent) => {
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

  return (
    <StyledSignUpContainer>
      <StyledSignUpFormWrapper>
        {/* top - component */}
        <SignUpTopWrapper />
        {/* Form - component */}
        <StyledSignUpFormContainer>
          {/* Oauth - component */}
          <SignUpOauthContainer onClick={oauthSignUp} />
          {/* Input - components */}
          <SignUpFieldsContainer />
          {/* Button - components */}
          <SignUpButtonsContainer onClick={emailSignUp} />
        </StyledSignUpFormContainer>
      </StyledSignUpFormWrapper>
    </StyledSignUpContainer>
  );
};

export default SignUp;

const StyledSignUpContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const StyledSignUpFormWrapper = styled.div`
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

const StyledSignUpFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 650px) {
    width: 80%;
  }
`;
