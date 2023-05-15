import styled from 'styled-components';

import LogInButton, { LogInButtonType } from './LogInButton';
import MoveToSignUpBtn from './MoveToSignUpButton';

const LogInButtonsContainer = ({ onClick }: LogInButtonType) => {
  return (
    <StyledLogInButtonsContainer>
      <LogInButton onClick={onClick} />
      <p className='mobile-hidden'>아직 회원이 아니신가요?</p>
      <MoveToSignUpBtn />
    </StyledLogInButtonsContainer>
  );
};

export default LogInButtonsContainer;

const StyledLogInButtonsContainer = styled.div`
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
