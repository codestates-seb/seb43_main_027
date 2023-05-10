import styled from 'styled-components';
import ButtonEl from '../../components/elements/Button';

export interface SignUpButton {
  onClick: React.MouseEventHandler;
}

const SignUpBtn = ({ onClick }: SignUpButton) => {
  return (
    <StyledSignUpBtnContainer>
      <StyledSignUpBtn onClick={onClick}>
        <p>회원가입</p>
      </StyledSignUpBtn>
    </StyledSignUpBtnContainer>
  );
};

export default SignUpBtn;

const StyledSignUpBtnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledSignUpBtn = ButtonEl({
  fontSize: '1.6rem'
});
