import styled from 'styled-components';
import Title from '../layouts/Posting/Title';
import InputSection from '../layouts/Posting/InputSection';

const Posting = () => {
  return (
    <StyledContainer>
      <Title text='게시글 작성하기' />
      <InputSection />
    </StyledContainer>
  );
};

export default Posting;

const StyledContainer = styled.div`
  min-height: calc(100vh - 50px);
  padding: 2rem;
`;
