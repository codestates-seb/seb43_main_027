import styled from 'styled-components';

const Title = ({ text }: { text: string }) => {
  return <StyledContainer>{text}</StyledContainer>;
};

export default Title;

const StyledContainer = styled.h2`
  font-weight: bold;
  font-size: 2.4rem;
`;
