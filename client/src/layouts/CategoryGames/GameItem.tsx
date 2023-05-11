import React from 'react';
import styled from 'styled-components';

const GameItem = ()  => {
  return (
    <StyledItemWrapper>
      <StyledImg src='https://m.gjcdn.net/game-thumbnail/1000/164227-f2fvqeih-v4.webp' alt='game-image' />
      <StyledTagContain>
        <StyledTag>FPS</StyledTag>
        <StyledTag>힐링</StyledTag>
        <StyledTag>아케이드</StyledTag>
      </StyledTagContain>
      <StyledTitle>리얼극장121323132132312332323232</StyledTitle>
      <StyledFollow>팔로워: 40</StyledFollow>
    </StyledItemWrapper>
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
  &:hover{
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
`;

const StyledTag = styled.span`
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--cyan-dark-500);
  background-color: var(--cyan-dark-100);
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