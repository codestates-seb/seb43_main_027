import styled from 'styled-components';
import Title from '../components/Posting/Title';
import InputSection from '../components/Posting/InputSection';
import { useParams } from 'react-router-dom';

const Posting = () => {
  const { postId } = useParams();
  return (
    <StyledContainer>
      <Title text={postId ? '게시글 수정하기' : '게시글 작성하기'} />
      <InputSection />
    </StyledContainer>
  );
};

export default Posting;

const StyledContainer = styled.div`
  min-height: calc(100vh - 50px);
  padding: 2rem;
  width: 100%;
  @media screen and (min-width: 650px) {
    padding: 2rem 5rem;
  }
`;
