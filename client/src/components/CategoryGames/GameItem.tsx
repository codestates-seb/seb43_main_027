import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CategoryTag from '../common/CategoryTag';
import { dummyGamesData } from '../../data/dummyCategories';
import { GameItemPropsType } from '../../types/propsTypes';
import PATH_URL from '../../constants/pathUrl';
import categoryData from '../../data/categoryData';

const GameItem = ({
  gameId,
  gameName,
  followerCount,
  categories,
  mainImgUrl
}: GameItemPropsType) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={`${PATH_URL.GAME}${gameId}`} onClick={handleClick}>
      <StyledItemWrapper>
        <StyledImg src={mainImgUrl} alt='game-image' />
        <StyledTagContain>
          {categories
            .map((item, index) => (
              <CategoryTag
                key={index}
                categoryId={item.categoryId}
                categoryName={categoryData[item.categoryName].text}
              />
            ))
            .slice(0, 3)}
        </StyledTagContain>
        <StyledTitle>{gameName}</StyledTitle>
        <StyledFollow>게임 팔로워: {followerCount}</StyledFollow>
      </StyledItemWrapper>
    </Link>
  );
};

export default GameItem;

const StyledItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  width: 200px;
  &:hover {
    color: var(--cyan-dark-600);
  }
`;

const StyledImg = styled.img`
  width: 200px;
  height: 160px;
  border-radius: 15px;
`;

const StyledTagContain = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  max-width: 200px;
  flex-wrap: wrap;
`;

const StyledTitle = styled.h2`
  max-width: 200px;
  font-size: 18px;
  font-weight: 700;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const StyledFollow = styled.p`
  font-size: 14px;
  color: var(--default-text-color);
`;
