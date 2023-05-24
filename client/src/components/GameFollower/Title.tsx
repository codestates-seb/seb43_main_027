import styled from 'styled-components';

const Title = ({ gameName }: { gameName: string }) => {
  return <StyledTitle>{gameName}을 팔로우한 유저</StyledTitle>;
};

export default Title;

const StyledTitle = styled.h3`
  font-size: 2rem;
  padding: 0.5rem;
`;
