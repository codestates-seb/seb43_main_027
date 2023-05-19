import styled from 'styled-components';
import LoginLogo from './LoginLogo';

const LoginTopWrapper = () => {
  return (
    <StyledLoginTopWrapper>
      <LoginLogo />
      <div className='cover'>
        <p>인디벗에서 취향이 맞는 벗과</p>
        <p>다양한 인디게임을 즐겨보세요!</p>
      </div>
    </StyledLoginTopWrapper>
  );
};

export default LoginTopWrapper;

const StyledLoginTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4rem 0;
`;
