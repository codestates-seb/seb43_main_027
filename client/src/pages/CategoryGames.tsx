import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameList from '../layouts/CategoryGames/GameList';
import FilterTap from '../components/common/FilterTap';
import RecommendGames from '../layouts/CategoryGames/RecommendGames';
import TitleCategory from '../layouts/CategoryGames/TitleCategory';
import { categoryFilterTab } from '../data/filterTapList';

const CategoryGames = () => {

  const handleClick = (item: string) => {
    console.log(item);
  }

  return (
    <StyledCategoryGamesWrapper>
      <StyleContain>
        <TitleCategory />
        <RecommendGames />
        <FilterTap
          onClickFilter={handleClick}
          filterList={categoryFilterTab} 
        />
        <GameList />
      </StyleContain>
    </StyledCategoryGamesWrapper>
  );
};

export default CategoryGames;

const StyledCategoryGamesWrapper = styled.div`
  background-color: var(--cyan-light-100);
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  flex-grow: 1;
  overflow-x: hidden;
`;

const StyleContain = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--title-bg);
  position: relative;
`;
