import styled from 'styled-components';

import MainContainer from '../layouts/CategoryGames/MainContainer';

const CategoryGames = () => {
  return (
    <>
      <StyledCategoryGamesWrapper>
        <MainContainer />
      </StyledCategoryGamesWrapper>
    </>
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
