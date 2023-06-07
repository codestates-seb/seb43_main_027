import styled from 'styled-components';

import CategoryContainer from '../components/Home/CategoryContainer';
import GameContainer from '../components/Home/GameContainer';
import NoticeModal from '../components/NoticeModal/NoticeModal';

const Home = () => {
  return (
    <>
      <NoticeModal />
      <StyledContainer>
        <CategoryContainer />
        <GameContainer />
      </StyledContainer>
    </>
  );
};

export default Home;
const StyledContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: var(--title-bg);
`;
