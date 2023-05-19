import styled from 'styled-components';
import ButtonEl from '../elements/Button';
import { Link } from 'react-router-dom';

const MoveToSignupButton = () => {
  return (
    <StyledSignupButtonContainer>
      <StyledSignupButton>
        <Link to='/signup'>
          <p>회원가입</p>
        </Link>
      </StyledSignupButton>
    </StyledSignupButtonContainer>
  );
};

export default MoveToSignupButton;

const StyledSignupButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledSignupButton = ButtonEl({
  flex: '1',
  fontSize: '1.6rem',
  bg: 'var(--button-inactive-color)',
  hoverBg: 'var(--button-inactive-hover-color)'
});
