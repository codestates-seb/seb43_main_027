import styled from 'styled-components';

import CategoryContainer from '../components/Home/CategoryContainer';
import GameContainer from '../components/Home/GameContainer';

const Home = () => {
  return (
    <StyleContain>
      <CategoryContainer />
      <GameContainer />
    </StyleContain>
  );
};

export default Home;
const StyleContain = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: var(--title-bg);
`;
