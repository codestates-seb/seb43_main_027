import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import FilterBar from './FilterBar';
import HomeGameCard from './HomeGameCard';

import { GameType, PageInfoType } from '../../types/dataTypes';
import Pagination from 'react-js-pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { getFilterPath } from '../../data/filterTabList';

const GameContainer = () => {
  const user = useSelector((s: RootState) => s.user);
  const [games, setGames] = useState<GameType[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    page: 1,
    size: 14,
    totalPage: 1,
    totalSize: 1
  });

  const [tab, setTab] = useState<string>('인기');
  const apiPath = useMemo(() => getFilterPath(user.memberId), [user]);

  const onTabClickHandler = (clickTab: string) => () => {
    setTab(clickTab);
  };
  const onPageClickHandler = (page: number) => {
    setCurPage(page);
  };

  useEffect(() => {
    if (tab === '인기' || tab === '신규') {
      (async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}${apiPath[tab]}&page=${
              curPage !== pageInfo.page ? curPage : 1
            }&size=${pageInfo.size}`
          );
          setGames(res.data.data);
          setPageInfo(res.data.pageInfo);
          // isTabIndChanged() && setCurPage(1);
          curPage === pageInfo.page && setCurPage(1);
        } catch (err) {
          console.error(err);
        }
      })();
    } else {
      (async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}${apiPath[tab]}`
          );
          const newPageInfo = {
            ...pageInfo,
            page: curPage !== pageInfo.page ? curPage : 1,
            totalSize: res.data.data.length,
            totalPage: Math.ceil(res.data.data.length / 14)
          };

          const startInd = (newPageInfo.page - 1) * newPageInfo.size;
          const endInd = startInd + newPageInfo.size;
          setGames(res.data.data.slice(startInd, endInd));
          setPageInfo(newPageInfo);
          // isTabIndChanged() && setCurPage(1);
          curPage === pageInfo.page && setCurPage(1);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [tab, curPage]);

  return (
    <StyledWrapper>
      <StyledContainer>
        <FilterBar onClickHandler={onTabClickHandler} tab={tab} />
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
  justify-content: center;

  @media screen and (min-width: 520px) {
    justify-content: space-between;
  }

  @media screen and (min-width: 650px) {
    gap: 3rem calc(100% - 400px);
    justify-content: flex-start;
  }

  @media screen and (min-width: 780px) {
    gap: 3rem calc((100% - 600px) / 3);
  }
  @media screen and (min-width: 1200px) {
    gap: 3rem calc((100% - 800px) / 4);
  }
  @media screen and (min-width: 1400px) {
    gap: 3rem calc((100% - 1000px) / 5);
  }
  @media screen and (min-width: 1600px) {
    gap: 3rem calc((100% - 1200px) / 6);
  }
  @media screen and (min-width: 1800px) {
    gap: 3rem calc((100% - 1400px) / 7);
  }
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
