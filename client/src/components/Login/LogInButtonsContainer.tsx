import styled from 'styled-components';

import LoginButton, { LoginButtonType } from './LogInButton';
import MoveToSignupBtn from './MoveToSignUpButton';

const LoginButtonsContainer = ({ onClick }: LoginButtonType) => {
  return (
    <StyledLoginButtonsContainer>
      <LoginButton onClick={onClick} />
      <p className='mobile-hidden'>아직 회원이 아니신가요?</p>
      <MoveToSignupBtn />
    </StyledLoginButtonsContainer>
  );
};

export default LoginButtonsContainer;

const StyledLoginButtonsContainer = styled.div`
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
