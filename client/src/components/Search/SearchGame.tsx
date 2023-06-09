import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { CategoryType, GameType, PageInfoType } from '../../types/dataTypes';
import GameItem from '../CategoryGames/GameItem';
import RecommandationBar from './RecommandationBar';
import SearchGameTop from './SearchGameTop';
import Pagination from 'react-js-pagination';

interface SearchGameType {
  isSelectTab: '전체' | '게임';
  searchGameInfo: SearchGameInfo;
  searchQuery: string | null;
}

export interface SearchGameInfo {
  data: GameType[];
  pageInfo: PageInfoType;
}

interface SearchGameWrapperType {
  isPreview: boolean;
}

const SearchGame = ({
  isSelectTab,
  searchGameInfo,
  searchQuery
}: SearchGameType) => {
  const [recommandTag, setRecommandTag] = useState<CategoryType[]>([]);
  const [reordered, setReordered] = useState<GameType[]>([]);
  const [isPage, setPage] = useState<number>(1);
  const [isSize, setSize] = useState<number>(20);
  const [isToTalSize, setTotalSize] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    setPage(1);
  }, [isSelectTab]);

  useEffect(() => {
    const fetchGamesData = async () => {
      if (searchGameInfo.data.length === 0) {
        try {
          if (searchQuery) {
            setSize(searchGameInfo.pageInfo.size);
            setTotalSize(searchGameInfo.pageInfo.totalSize);
          } else {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/games/search?q=&page=${isPage}&size=${isSize}`;
            const res = await axios.get(apiUrl);
            const gamesData = res.data.data.sort(
              (a: { createdAt: string }, b: { createdAt: string }) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            const pageInfo = res.data.pageInfo;
            setReordered([...gamesData]);
            setSize(pageInfo.size);
            setTotalSize(pageInfo.totalSize);
            searchGameInfo.data = reordered;
          }
        } catch (error) {
          return navigate('/error');
        }
      } else {
        setSize(searchGameInfo.pageInfo.size);
        setTotalSize(searchGameInfo.pageInfo.totalSize);
      }
    };
    fetchGamesData();
  }, [isPage]);

  useEffect(() => {
    const reducer = (accumulator: any, currentValue: any) => {
      const mergedArray = [...accumulator, ...currentValue.categories];

      const uniqueCategories = mergedArray.reduce((unique, item) => {
        if (
          !unique.some(
            (uniqueItem: any) => uniqueItem.categoryId === item.categoryId
          )
        ) {
          unique.push(item);
        }
        return unique;
      }, []);

      return uniqueCategories;
    };

    setRecommandTag(searchGameInfo.data.reduce(reducer, []));
  }, [searchGameInfo, isPage]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <StyledSearchGameWrapper isPreview={isSelectTab === '전체' ? true : false}>
      {isSelectTab === '전체' && <SearchGameTop />}
      <StyledContentBox isPreview={isSelectTab === '전체' ? true : false}>
        {searchGameInfo.data.length > 0 && searchGameInfo.data[0].gameId > 0 ? (
          isSelectTab === '전체' ? (
            <StyledCardContainer isPreview={true}>
              {searchGameInfo.data.slice(0, 7).map((item) => (
                <GameItem
                  key={item.gameId}
                  gameId={item.gameId}
                  gameName={item.gameName}
                  followerCount={item.followerCount}
                  categories={item.categories}
                  mainImgUrl={item.mainImgUrl}
                />
              ))}
            </StyledCardContainer>
          ) : (
            <StyledCardContainer isPreview={false}>
              {searchGameInfo.data.map((item) => (
                <GameItem
                  key={item.gameId}
                  gameId={item.gameId}
                  gameName={item.gameName}
                  followerCount={item.followerCount}
                  categories={item.categories}
                  mainImgUrl={item.mainImgUrl}
                />
              ))}
            </StyledCardContainer>
          )
        ) : (
          <StyledEmptyItem isPreview={isSelectTab === '전체' ? true : false}>
            <StyledStyleBox isPreview={isSelectTab === '전체' ? true : false}>
              검색 결과가 없습니다.
            </StyledStyleBox>
          </StyledEmptyItem>
        )}
        {isSelectTab === '게임' && (
          <RecommandationBar
            recommandTag={recommandTag}
            setRecommandTag={setRecommandTag}
          />
        )}
      </StyledContentBox>

      <StyledPaginationBox>
        {searchGameInfo.data.length > 0 &&
          searchGameInfo.data[0].gameId > 0 &&
          isSelectTab !== '전체' && (
            <StyledPagination>
              <Pagination
                activePage={isPage}
                itemsCountPerPage={isSize}
                totalItemsCount={isToTalSize}
                pageRangeDisplayed={5}
                prevPageText={'‹'}
                nextPageText={'›'}
                onChange={handlePageChange}
              />
            </StyledPagination>
          )}
      </StyledPaginationBox>
    </StyledSearchGameWrapper>
  );
};

export default SearchGame;

const StyledSearchGameWrapper = styled.div<SearchGameWrapperType>`
  display: flex;
  flex-direction: column;
  margin: 3rem;
  border-radius: 15px;

  ${(p) =>
    p.isPreview
      ? 'height:30%; align-items:center; background-color: #cfecee;'
      : 'height: 50%;'}
`;

const StyledContentBox = styled.div<SearchGameWrapperType>`
  display: flex;
  width: 90%;
  height: 100%;
  ${({ isPreview }) =>
    isPreview ? 'flex-direction: column; ' : 'flex-direction: row; '}
  border-radius: 15px;
`;
const StyledPaginationBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledEmptyItem = styled.div<SearchGameWrapperType>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isPreview }) =>
    isPreview ? 'padding: 0 0 20px 0px;' : 'padding: 40px 0px;'}

  background-color: #cfecee;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
`;

const StyledStyleBox = styled.div<SearchGameWrapperType>`
  ${({ isPreview }) => (isPreview ? 'width: 100%;' : 'width: 85%;')}
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 50px 0px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
  background-color: white;
`;

const StyledCardContainer = styled.div<SearchGameWrapperType>`
  display: flex;
  flex-wrap: wrap;
  background-color: #cfecee;
  border-radius: 15px;
  gap: 3rem 5%;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  ${({ isPreview }) =>
    isPreview ? 'padding: 0 5rem 2rem 5rem;' : 'padding: 1rem 1rem;'}
  ${({ isPreview }) =>
    isPreview
      ? css`
          height: 30%;

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
        `
      : css`
          height: 30%;
          @media screen and (min-width: 520px) {
          }

          @media screen and (min-width: 760px) {
            justify-content: flex-start;
            gap: 3rem calc((100% - 360px) / 2);
          }

          @media screen and (min-width: 900px) {
            gap: 3rem calc((100% - 500px) / 3);
          }
          @media screen and (min-width: 1000px) {
            gap: 3rem calc((100% - 600px) / 3);
          }
          @media screen and (min-width: 1200px) {
            gap: 3rem calc((100% - 800px) / 4);
          }
        `}
  > a {
    background-color: white;
    border-radius: 15px;
    padding: 1rem;
    margin-top: 2rem;
  }
`;

const StyledPagination = styled.div`
  padding: 0px 30px 50px 30px;
`;
