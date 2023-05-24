import styled from 'styled-components';
import Title from './Title';

const ContentBox = () => {
  return (
    <StyledContainer>
      <Title gameName={'test'} />
    </StyledContainer>
  );
};

export default ContentBox;

const StyledContainer = styled.div`
  padding: 1rem;
`;
