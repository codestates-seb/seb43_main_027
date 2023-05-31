import styled from 'styled-components';
import ButtonEl from '../elements/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export interface SignupButton {
  onClick: React.MouseEventHandler;
}

const SignupBtn = ({ onClick }: SignupButton) => {
  const usernamevalidity = useSelector(
    (state: RootState) => state.signupvalid.usernamevalid
  );
  const emailvalidity = useSelector(
    (state: RootState) => state.signupvalid.emailvalid
  );
  const passwordvalidity = useSelector(
    (state: RootState) => state.signupvalid.passwordvalid
  );
  const emailconfirmed = useSelector(
    (state: RootState) => state.signupvalid.emailconfirmed
  );
  return (
    <StyledSignupBtnContainer>
      <StyledDiv
        className={
          usernamevalidity && emailvalidity && passwordvalidity
            ? ''
            : 'disabled'
        }
      >
        <StyledSignupBtn onClick={onClick}>
          <p>{!emailconfirmed ? '이메일인증' : '회원가입'}</p>
        </StyledSignupBtn>
      </StyledDiv>
    </StyledSignupBtnContainer>
  );
};

export default SignupBtn;

const StyledSignupBtnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  .disabled {
    pointer-events: none;
    button {
      background-color: var(--button-inactive-color);
    }
  }
`;

const StyledSignupBtn = ButtonEl({
  flex: '1',
  fontSize: '1.6rem',
  type: 'submit'
});

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
