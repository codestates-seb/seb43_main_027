import styled from 'styled-components';
import ButtonEl from '../elements/Button';
import { Link } from 'react-router-dom';

const MoveToLoginBtn = () => {
  return (
    <StyledLoginBtnContainer>
      <StyledLoginBtn>
        <Link to='/login'>
          <p>로그인</p>
        </Link>
      </StyledLoginBtn>
    </StyledLoginBtnContainer>
  );
};

export default MoveToLoginBtn;

const StyledLoginBtnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLoginBtn = ButtonEl({
  flex: '1',
  fontSize: '1.6rem',
  bg: 'var(--button-inactive-color)',
  hoverBg: 'var(--button-inactive-hover-color)'
});
