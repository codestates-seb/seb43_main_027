import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import axios from 'axios';

import { GameType } from '../../types/dataTypes';
import { RootState } from '../../store/store';

const FilterBar = ({
  setGames
}: {
  setGames: React.Dispatch<React.SetStateAction<GameType[]>>;
}) => {
  const user = useSelector((s: RootState) => s.user);
  const [tabInd, setTabInd] = useState<number>(0);
  const apiRef = useRef([
    '/api/games?filter=POPULAR',
    '/api/games?filter=NEW',
    `/api/members/${user.memberId}/mygame`
  ]);
  const onClickHandler = (i: number) => () => {
    setTabInd(i);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}${apiRef.current[tabInd]}`
        );
        setGames(res.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [tabInd]);
  return (
    <StyledContainer>
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
    </StyledContainer>
  );
};

export default FilterBar;

const StyledContainer = styled.div`
  display: flex;
  margin-bottom: 5rem;
  border-bottom: 2px solid #8f8f8f;
  gap: 1rem;
  padding-left: 2rem;
`;

const StyledItem = styled.button<{ selected: boolean }>`
  border: 2px solid #8f8f8f;
  border-bottom: none;
  padding: 0.5rem 1rem;
  border-top-right-radius: 5px;
  background-color: transparent;
  border-top-left-radius: 5px;
  color: ${({ selected }) => (selected ? 'var(--cyan-dark-500)' : ' #999')};
  &:hover {
    color: var(--cyan-dark-500);
  }
`;
