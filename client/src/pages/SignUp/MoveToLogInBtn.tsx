import styled from 'styled-components';
import ButtonEl from '../../components/elements/Button';
import { Link } from 'react-router-dom';

const MoveToLogInBtn = () => {
  return (
    <StyledLogInBtnContainer>
      <StyledLogInBtn>
        <Link to='/login'>
          <p>로그인</p>
        </Link>
      </StyledLogInBtn>
    </StyledLogInBtnContainer>
  );
};

export default MoveToLogInBtn;

const StyledLogInBtnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLogInBtn = ButtonEl({
  fontSize: '1.6rem',
  bg: 'var(--button-inactive-color)',
  hoverBg: 'var(--button-inactive-hover-color)'
});
