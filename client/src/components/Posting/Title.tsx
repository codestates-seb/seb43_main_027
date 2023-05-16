import styled from 'styled-components';

const Title = ({ text }: { text: string }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export default Title;

const StyledTitle = styled.h2`
  font-weight: bold;
  font-size: 2.4rem;
  margin: 5rem 0 3rem;
`;
