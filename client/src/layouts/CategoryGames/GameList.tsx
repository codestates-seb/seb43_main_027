import React from 'react';
import styled from 'styled-components';
import GameItem from './GameItem';
import { dummyGameData } from '../../data/dummyCategories';

const GameList = ()  => {

  return (
    <StyledGameList>
      {
        dummyGameData.map((item, index) => (
          <GameItem 
            key={item.gameId} 
            gameId={item.gameId}
          />
        ))
      }
    </StyledGameList>
  );
};

export default GameList;

const StyledGameList = styled.div`
  display: flex;
  width: 100%;
  padding: 50px;
  position: relative;
  align-items: flex-start;
  gap: 25px;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 100%;
  @media screen and (max-width: 650px) {
    flex-wrap: wrap;
    flex-basis: 50%;
    padding: 50px 35px;
  }
`;