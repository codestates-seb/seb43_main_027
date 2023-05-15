import styled from 'styled-components';
import LogInLogo from './LogInLogo';

const LogInTopWrapper = () => {
  return (
    <StyledLogInTopWrapper>
      <LogInLogo />
      <div className='cover'>
        <p>인디벗에서 취향이 맞는 벗과</p>
        <p>다양한 인디게임을 즐겨보세요!</p>
      </div>
    </StyledLogInTopWrapper>
  );
};

export default LogInTopWrapper;

const StyledLogInTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4rem 0;
`;
