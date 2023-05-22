import styled from 'styled-components';
import Title from '../components/Posting/Title';
import InputSection from '../components/Posting/InputSection';
import { useParams } from 'react-router-dom';
import { useCheckAuth } from '../hooks/useCheckAuth';
import PATH_URL from '../constants/pathUrl';

const Posting = () => {
  const { postId } = useParams();

  useCheckAuth(PATH_URL.LOGIN);

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
