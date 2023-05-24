import styled from 'styled-components';

const Title = () => {
  return <StyledTitle>이 게임을 팔로우한 유저</StyledTitle>;
};

export default Title;

const StyledTitle = styled.h3`
  font-size: 2rem;
  padding: 2rem 0.5rem 0;
`;
