import styled from 'styled-components';
import GameItem from '../CategoryGames/GameItem';
import { GameType } from '../../types/dataTypes';

const GameCardList = ({ games }: { games: GameType[] }) => {
  return (
    <StyledCardContainer>
      {games.length === 0 && (
        <StyledEmptyItem>등록된 게임 채널이 없습니다.</StyledEmptyItem>
      )}
      {games.map((game) => (
        <GameItem key={game.gameId} {...game} />
      ))}
    </StyledCardContainer>
  );
};

export default GameCardList;

const StyledCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5rem;
  align-items: center;
  gap: 3rem 5%;
  justify-content: center;

  @media screen and (min-width: 520px) {
    justify-content: space-between;
  }

  @media screen and (min-width: 650px) {
    gap: 3rem calc(100% - 400px);
    justify-content: flex-start;
  }

  @media screen and (min-width: 780px) {
    gap: 3rem calc((100% - 600px) / 3);
  }
  @media screen and (min-width: 1200px) {
    gap: 3rem calc((100% - 800px) / 4);
  }
  @media screen and (min-width: 1400px) {
    gap: 3rem calc((100% - 1000px) / 5);
  }
  @media screen and (min-width: 1600px) {
    gap: 3rem calc((100% - 1200px) / 6);
  }
  @media screen and (min-width: 1800px) {
    gap: 3rem calc((100% - 1400px) / 7);
  }
`;

const StyledEmptyItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
`;
