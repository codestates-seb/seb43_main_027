import styled from 'styled-components';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import FilterBar from './FilterBar';

import { GameType, PageInfoType } from '../../types/dataTypes';
import { RootState } from '../../store/store';

import { getData } from '../../api/apiCollection';
import { makeNewPageInfo } from '../../utils/makeNewPageInfo';
import { getFilterPath } from '../../data/filterTabList';
import GameCardList from './GameCardList';
import GameCardPagination from './GameCardPagination';

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

  const onSuccess = ({
    data
  }: {
    data: { data: GameType[]; pageInfo?: PageInfoType };
  }) => {
    if (data.pageInfo) {
      setGames(data.data);
      setPageInfo(data.pageInfo);
    } else {
      const [startInd, endInd, newPageInfo] = makeNewPageInfo(
        data.data,
        pageInfo,
        curPage
      );
      setGames(data.data.slice(startInd, endInd));
      setPageInfo(newPageInfo);
    }

    curPage === pageInfo.page && setCurPage(1);
  };

  useEffect(() => {
    let url = '';
    if (tab == '인기' || tab == '신규') {
      url = `${process.env.REACT_APP_API_URL}${apiPath[tab]}&page=${
        curPage !== pageInfo.page ? curPage : 1
      }&size=${pageInfo.size}`;
    } else {
      url = `${process.env.REACT_APP_API_URL}${apiPath[tab]}`;
    }

    getData(url, onSuccess, (error) => {
      console.error(error);
    });
  }, [tab, curPage]);

  return (
    <StyledWrapper>
      <StyledContainer>
        <FilterBar onClickHandler={onTabClickHandler} tab={tab} />
        <GameCardList games={games} />
        <GameCardPagination
          gameLength={games.length}
          curPage={curPage}
          pageInfo={pageInfo}
          onPageClickHandler={onPageClickHandler}
        />
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
