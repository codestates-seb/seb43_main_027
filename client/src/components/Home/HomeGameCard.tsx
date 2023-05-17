import styled from 'styled-components';

// import GameCard from '../common/GameCard';
import { GameType } from '../../types/dataTypes';
import GameItem from '../CategoryGames/GameItem';

const HomeGameCard = (props: GameType) => {
  return (
    <StyledContainer>
      <GameItem {...props} />
    </StyledContainer>
  );
};

export default HomeGameCard;

const StyledContainer = styled.div`
  width: 100%;
  @media screen and (min-width: 650px) {
    width: 30%;
  }
  @media screen and (min-width: 1200px) {
    width: 22%;
  }
`;
