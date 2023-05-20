import styled from 'styled-components';
import ButtonEl from '../elements/Button';

export interface SignupButton {
  onClick: React.MouseEventHandler;
}

const SignupBtn = ({ onClick }: SignupButton) => {
  return (
    <StyledSignupBtnContainer>
      <StyledSignupBtn onClick={onClick}>
        <p>회원가입</p>
      </StyledSignupBtn>
    </StyledSignupBtnContainer>
  );
};

export default SignupBtn;

const StyledSignupBtnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledSignupBtn = ButtonEl({
  flex: '1',
  fontSize: '1.6rem'
});
