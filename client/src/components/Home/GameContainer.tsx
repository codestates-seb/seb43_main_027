import { useState } from 'react';
import styled from 'styled-components';

import { Empty } from 'antd';
import FilterBar from './FilterBar';
import HomeGameCard from './HomeGameCard';

import { GameType } from '../../types/dataTypes';

const GameContainer = () => {
  const [games, setGames] = useState<GameType[]>([]);
  return (
    <StyledWrapper>
      <StyledContainer>
        <FilterBar setGames={setGames} />
        <StyledCardContainer>
          {games.length === 0 && (
            <Empty
              description={
                <StyledNotFoundText>
                  게임을 찾을 수 없습니다.
                </StyledNotFoundText>
              }
            />
          )}
          {games.map((game) => (
            <HomeGameCard key={game.gameId} {...game} />
          ))}
        </StyledCardContainer>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default GameContainer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`;

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem 5%;
  @media screen and (min-width: 1200px) {
    gap: 3rem 4%;
  }
`;

const StyledNotFoundText = styled.div`
  margin-top: 3rem;
`;
