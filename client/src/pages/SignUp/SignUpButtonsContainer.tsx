import styled from 'styled-components';

import SignUpBtn, { SignUpButton } from './SignUpBtn';
import MoveToLogInBtn from './MoveToLogInBtn';

const SignUpButtonsContainer = ({ onClick }: SignUpButton) => {
  return (
    <StyledSignUpButtonsContainer>
      <SignUpBtn onClick={onClick} />
      <p className='mobile-hidden'>이미 회원이신가요?</p>
      <MoveToLogInBtn />
    </StyledSignUpButtonsContainer>
  );
};

export default SignUpButtonsContainer;

const StyledSignUpButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;

  .mobile-hidden {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 650px) {
    flex-direction: row;
    .mobile-hidden {
      display: none;
    }
  }
`;
