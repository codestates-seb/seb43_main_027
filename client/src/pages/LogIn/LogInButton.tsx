import styled from 'styled-components';
import ButtonEl from '../../components/elements/Button';

export interface LogInButton {
  onClick: React.MouseEventHandler;
}

const LogInBtn = ({ onClick }: LogInButton) => {
  return (
    <StyledLogInBtnContainer>
      <StyledLogInBtn onClick={onClick}>
        <p>회원가입</p>
      </StyledLogInBtn>
    </StyledLogInBtnContainer>
  );
};

export default LogInBtn;

const StyledLogInBtnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLogInBtn = ButtonEl({
  fontSize: '1.6rem'
});
