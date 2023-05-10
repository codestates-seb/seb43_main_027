import styled from 'styled-components';
import GameCard from '../../components/common/GameCard';

import logo from '../../asset/logo.png';

import { GameType } from '../../types/dataTypes';

const dummy: GameType = {
  gameId: 1,
  mainImgUrl: logo,
  downloadUrl: 'test',
  gameName: 'testtestsetset',
  categories: [
    {
      categoryId: 1,
      categoryName: 'RPG'
    }
  ]
};

const NavGameCardContainer = () => {
  return (
    <StyledContainer>
      <GameCard {...dummy} />
    </StyledContainer>
  );
};

export default NavGameCardContainer;

const StyledContainer = styled.div`
  width: 45%;
`;
