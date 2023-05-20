import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import FilterBar from './FilterBar';
import HomeGameCard from './HomeGameCard';

import { GameType, PageInfoType } from '../../types/dataTypes';
import Pagination from 'react-js-pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';

const GameContainer = () => {
  const user = useSelector((s: RootState) => s.user);
  const [games, setGames] = useState<GameType[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    page: 1,
    size: 10,
    totalPage: 1,
    totalSize: 1
  });

  const [tabInd, setTabInd] = useState<number>(0);

  const apiRef = useRef([
    '/api/games/?filter=POPULAR',
    '/api/games/?filter=NEW',
    `/api/members/${user.memberId}/mygame`
  ]);

  const onClickHandler = (i: number) => () => {
    setTabInd(i);
  };
  const onPageClickHandler = (page: number) => {
    setCurPage(page);
  };

  useEffect(() => {
    if (tabInd === 0 || tabInd === 1) {
      (async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}${apiRef.current[tabInd]}?page=${curPage}&size=${pageInfo.size}`
          );
          setGames(res.data.data);
          setPageInfo(res.data.pageInfo);
        } catch (err) {
          console.error(err);
        }
      })();
    } else {
      (async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}${apiRef.current[tabInd]}`
          );
          const newPageInfo = {
            ...pageInfo,
            page: curPage,
            totalSize: res.data.data.length,
            totalPage: Math.ceil(res.data.data.length / 10)
          };

          const startInd = (newPageInfo.page - 1) * newPageInfo.size;
          const endInd = startInd + newPageInfo.size;
          setGames(res.data.data.slice(startInd, endInd));
          setPageInfo(res.data.pageInfo);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [tabInd, curPage]);

  return (
    <StyledWrapper>
      <StyledContainer>
        <FilterBar onClickHandler={onClickHandler} tabInd={tabInd} />
        <StyledCardContainer>
          {games.length === 0 && (
            <StyledEmptyItem>등록된 게임 채널이 없습니다.</StyledEmptyItem>
          )}
          {games.map((game) => (
            <HomeGameCard key={game.gameId} {...game} />
          ))}
        </StyledCardContainer>
        {games.length > 0 && (
          <StyledPagination>
            <Pagination
              activePage={curPage}
              itemsCountPerPage={pageInfo.size}
              totalItemsCount={pageInfo.totalSize}
              pageRangeDisplayed={5}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={onPageClickHandler}
            />
          </StyledPagination>
        )}
      </StyledContainer>
    </StyledWrapper>
  );
};

export default GameContainer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`;

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5rem;
  align-items: center;
  gap: 3rem 5%;
  @media screen and (min-width: 1200px) {
    gap: 3rem 4%;
  }
`;

const StyledNotFoundText = styled.div`
  margin-top: 3rem;
`;

const StyledEmptyItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
`;
const StyledPagination = styled.div`
  padding: 20px;
`;
