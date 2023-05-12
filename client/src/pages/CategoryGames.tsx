import React from 'react';
import styled from 'styled-components';
import GameList from '../layouts/CategoryGames/GameList';
import FilterTap from '../components/common/FilterTap';
import RecommendGames from '../layouts/CategoryGames/RecommendGames';
import TitleCategory from '../layouts/CategoryGames/TitleCategory';

const CategoryGames = () => {

  const filterList = ['전체 게임', '인기 게임', '신규 게임', '팔로우 게임'];

  return (
    <StyledCategoryGamesWrapper>
      <StyleContain>
        <TitleCategory />
        <RecommendGames />
        <FilterTap filterList={filterList} />
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
