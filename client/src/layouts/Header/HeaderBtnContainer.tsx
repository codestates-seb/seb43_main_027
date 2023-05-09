import styled from 'styled-components';

import HeaderBtn from './HeaderBtn';

const HeaderBtnContainer = () => {
  return (
    <StyledContainer>
      <HeaderBtn path='/login' text='로그인' isSignupBtn={false} />
      <HeaderBtn path='/signup' text='회원가입' isSignupBtn={true} />
    </StyledContainer>
  );
};

export default HeaderBtnContainer;
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
