import styled from 'styled-components';

import { GameType } from '../../types/dataTypes';
import { Link } from 'react-router-dom';
import PATH_URL from '../../constants/pathUrl';
import CategoryTag from './CategoryTag';
import convertCategory from '../../utils/convertCategory';
import { useState } from 'react';
import DefaultGame from '../../asset/DefaultGame.png';

const GameCard = ({ mainImgUrl, categories, gameName, gameId }: GameType) => {
  const defaultImg =
    mainImgUrl ===
    'https://codejejus-deploy.s3.ap-northeast-2.amazonaws.com/images/defaultGameImg.png';
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`${PATH_URL.GAME}${gameId}`}>
      <StyledContainer>
        {defaultImg || imageError ? (
          <StyledImg src={DefaultGame} />
        ) : (
          <StyledImg
            src={mainImgUrl}
            alt='game-image'
            onError={() => setImageError(true)}
          />
        )}
        <StyledBadgeContainer>
          {categories?.slice(0, 2).map((category) => (
            <CategoryTag
              categoryName={convertCategory.asKR(category.categoryName)}
              key={category.categoryId}
              categoryId={category.categoryId}
            />
          ))}
        </StyledBadgeContainer>
        <StyledTitle>{gameName}</StyledTitle>
      </StyledContainer>
    </Link>
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
  flex-wrap: wrap;
  gap: 0.3rem;
`;
const StyledTitle = styled.h3`
  display: -webkit-box;
  font-weight: bold;
  padding: 0.4rem;
  font-size: 2rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
`;
