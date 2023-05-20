import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import axios from 'axios';

import { GameType, PageInfoType } from '../../types/dataTypes';
import { RootState } from '../../store/store';

const FilterBar = ({
  onClickHandler,
  tabInd
}: {
  onClickHandler: (i: number) => () => void;
  tabInd: number;
}) => {
  const user = useSelector((s: RootState) => s.user);

  return (
    <StyledContainer>
      <StyledFilterTabContainer>
        <StyledItem onClick={onClickHandler(0)} selected={tabInd === 0}>
          인기
        </StyledItem>
        <StyledItem onClick={onClickHandler(1)} selected={tabInd === 1}>
          신규
        </StyledItem>
        {user.memberId !== -1 && (
          <StyledItem onClick={onClickHandler(2)} selected={tabInd === 2}>
            팔로우
          </StyledItem>
        )}
      </StyledFilterTabContainer>
    </StyledContainer>
  );
};

export default FilterBar;

const StyledContainer = styled.div`
  margin: 0px;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  justify-content: left;
  width: 100%;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;

const StyledItem = styled.li<{ selected: boolean }>`
  padding: 15px 15px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ selected }) => (selected ? 'var(--cyan-dark-500)' : ' #999')};
  border-bottom: ${({ selected }) =>
    selected ? '3px solid var(--cyan-dark-400)' : 'none'};
  cursor: pointer;

  @media screen and (max-width: 650px) {
    font-size: 12px;
    padding: 20px 15px;
  }
`;

const StyledFilterTabContainer = styled.ul`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: row;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;
