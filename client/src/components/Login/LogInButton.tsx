import styled from 'styled-components';
import ButtonEl from '../elements/Button';

export interface LoginButtonType {
  onClick: React.MouseEventHandler;
}

const LoginButton = ({ onClick }: LoginButtonType) => {
  return (
    <StyledLoginBtnContainer>
      <StyledLoginBtn onClick={onClick}>
        <p>로그인</p>
      </StyledLoginBtn>
    </StyledLoginBtnContainer>
  );
};

export default LoginButton;

const StyledLoginBtnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLoginBtn = ButtonEl({
  flex: '1',
  fontSize: '1.6rem'
});
