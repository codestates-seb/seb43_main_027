import styled from 'styled-components';

import CategoryContainer from '../components/Home/CategoryContainer';
import GameContainer from '../components/Home/GameContainer';
import { useState } from 'react';
import NoticeModal from '../components/NoticeModal/NoticeModal';

const Home = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && <NoticeModal setShow={setShow} />}
      <StyleContain>
        <CategoryContainer />
        <GameContainer />
      </StyleContain>
    </>
  );
};

export default Home;
const StyleContain = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: var(--title-bg);
`;
