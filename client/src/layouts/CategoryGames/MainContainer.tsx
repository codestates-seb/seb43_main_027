import React from 'react';
import styled from 'styled-components';
import TitleCategory from './TitleCategory';
import RecommendGames from './RecommendGames';

const MainContainer = () => {
  return (
    <StyleContain>
      <TitleCategory />
      <RecommendGames />
    </StyleContain>
  );
};

export default MainContainer;

const StyleContain = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--title-bg);
`;