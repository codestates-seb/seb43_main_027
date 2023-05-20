import styled from 'styled-components';

import SignupBtn, { SignupButton } from './SignupBtn';
import MoveToLoginBtn from './MoveToLoginBtn';

const SignupButtonsContainer = ({ onClick }: SignupButton) => {
  return (
    <StyledSignupButtonsContainer>
      <SignupBtn onClick={onClick} />
      <p className='mobile-hidden'>이미 회원이신가요?</p>
      <MoveToLoginBtn />
    </StyledSignupButtonsContainer>
  );
};

export default SignupButtonsContainer;

const StyledSignupButtonsContainer = styled.div`
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
