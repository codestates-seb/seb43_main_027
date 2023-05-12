import styled from 'styled-components';
import ButtonEl from '../../components/elements/Button';

export interface LogInButtonType {
  onClick: React.MouseEventHandler;
}

const LogInButton = ({ onClick }: LogInButtonType) => {
  return (
    <StyledLogInBtnContainer>
      <StyledLogInBtn onClick={onClick}>
        <p>로그인</p>
      </StyledLogInBtn>
    </StyledLogInBtnContainer>
  );
};

export default LogInButton;

const StyledLogInBtnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLogInBtn = ButtonEl({
  flex: '1',
  fontSize: '1.6rem'
});
