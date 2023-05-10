import styled from 'styled-components';

import logo from '../../asset/logo.png';
import Badge from '../ui/Badge';

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

const GameCard = () => {
  return (
    <StyledContainer>
      <StyledImg src={dummy.mainImgUrl} />
      <StyledBadgeContainer>
        {dummy.categories.map((category) => (
          <Badge text={category.categoryName} key={category.categoryId} />
        ))}
      </StyledBadgeContainer>
      <StyledTitle>{dummy.gameName}</StyledTitle>
    </StyledContainer>
  );
};

export default GameCard;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8rem;
`;
const StyledImg = styled.img`
  width: 100%;
  aspect-ratio: 16/12;
  border-radius: 5px;
  border: 1px solid var(--cyan-dark-500);
`;
const StyledBadgeContainer = styled.div`
  display: flex;
  gap: 0.3rem;
`;
const StyledTitle = styled.h3`
  display: -webkit-box;
  font-weight: bold;
  font-size: 2.2rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
`;
