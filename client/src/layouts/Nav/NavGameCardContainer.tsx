import styled from 'styled-components';
import GameCard from '../../components/common/GameCard';

import { GameType } from '../../types/dataTypes';

const NavGameCardContainer = ({ data: gameData }: { data: GameType }) => {
  return (
    <StyledContainer>
      <GameCard {...gameData} />
    </StyledContainer>
  );
};

export default NavGameCardContainer;

const StyledContainer = styled.div`
  width: 45%;
`;
