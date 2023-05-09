import React from 'react';
import styled from 'styled-components';
import Header from '../layouts/Header/Header';
import MainContainer from '../layouts/CategoryGames/MainContainer';

const CategoryGames = () => {
  return (
    <>
    <Header />
    <StyledCategoryGamesWrapper>
      <p>나브바</p>
      <MainContainer />
    </StyledCategoryGamesWrapper>
    </>
  );
};

export default CategoryGames;

const StyledCategoryGamesWrapper = styled.div`
  background-color: var(--cyan-light-100);
  width: 100vw;
  height: 100vh;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: row;

  p {
    width: 50px;
  }
`;