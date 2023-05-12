import React from 'react';
import styled from 'styled-components';
import CategoryTag from '../../components/common/CategoryTag';
import { dummyGameData, Game } from '../../data/dummyCategories';
import { Link } from 'react-router-dom';

const GameItem = ({ gameId }: { gameId: number }) => {
  const game: Game | undefined = dummyGameData.find(
    (item) => item.gameId.toString() === gameId.toString()
  );
  const currentGameData = game?.categories ?? [];
  const followNumber = 10; // 데이터패칭 해야됨 + 팔로우 기능추가 (버튼클릭시 텍스트변경)

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={`/games/${gameId}`} onClick={handleClick}>
      <StyledItemWrapper>
        <StyledImg src={game?.mainImgUrl} alt='game-image' />
        <StyledTagContain>
          {currentGameData.map((item, index) => (
            <CategoryTag
              key={index}
              index={index}
              categoryName={item.categoryName}
            />
          ))}
        </StyledTagContain>
        <StyledTitle>{game?.gameName}</StyledTitle>
        <StyledFollow>팔로워: {followNumber}</StyledFollow>
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
