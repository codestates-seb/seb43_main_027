import styled from 'styled-components';
import SULogo from './SULogo';

const SignUpTopWrapper = () => {
  return (
    <StyledSignUpTopWrapper>
      <SULogo />
      <div className='cover'>
        <p>인디벗에서 취향이 맞는 벗과</p>
        <p>다양한 인디게임을 즐겨보세요!</p>
      </div>
    </StyledSignUpTopWrapper>
  );
};

export default SignUpTopWrapper;

const StyledSignUpTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4rem 0;
`;
