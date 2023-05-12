import React from 'react';
import styled from 'styled-components';
import TitleCategory from './TitleCategory';
import RecommendGames from './RecommendGames';
import FilterTap from './FilterTap';
import GameList from './GameList';

const MainContainer = () => {
  return (
    <StyleContain>
      <TitleCategory />
      <RecommendGames />
      <FilterTap />
      <GameList />
    </StyleContain>
  );
};

export default MainContainer;

const StyleContain = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--title-bg);
  position: relative;
`;