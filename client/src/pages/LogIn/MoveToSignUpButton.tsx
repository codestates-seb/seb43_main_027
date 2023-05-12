import styled from 'styled-components';
import ButtonEl from '../../components/elements/Button';
import { Link } from 'react-router-dom';

const MoveToSignUpButton = () => {
  return (
    <StyledSignUpButtonContainer>
      <StyledSignUpButton>
        <Link to='/signup'>
          <p>회원가입</p>
        </Link>
      </StyledSignUpButton>
    </StyledSignUpButtonContainer>
  );
};

export default MoveToSignUpButton;

const StyledSignUpButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledSignUpButton = ButtonEl({
  fontSize: '1.6rem',
  bg: 'var(--button-inactive-color)',
  hoverBg: 'var(--button-inactive-hover-color)'
});
