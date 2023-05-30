import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';

import { CategoryType, GameType, PageInfoType } from '../../types/dataTypes';
import GameItem from '../CategoryGames/GameItem';
import RecommandationBar from './RecommandationBar';
import SearchGameTop from './SearchGameTop';

interface SearchGameType {
  isSelectTab: '전체' | '게임';
  searchGameInfo: SearchGameInfo;
}

export interface SearchGameInfo {
  data: GameType[];
  pageInfo: PageInfoType;
}

interface SearchGameWrapperType {
  isPreview: boolean;
}

const SearchGame = ({ isSelectTab, searchGameInfo }: SearchGameType) => {
  const [recommandTag, setRecommandTag] = useState<CategoryType[]>([]);

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
  }, [searchGameInfo]);

  return (
    <StyledSearchGameWrapper isPreview={isSelectTab === '전체' ? true : false}>
      {searchGameInfo.data.length > 0 && searchGameInfo.data[0].gameId > 0 ? (
        isSelectTab === '전체' ? (
          <>
            <SearchGameTop />
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
          </>
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
        <StyledEmptyItem>검색 결과가 없습니다.</StyledEmptyItem>
      )}
      {isSelectTab === '게임' && (
        <RecommandationBar
          recommandTag={recommandTag}
          setRecommandTag={setRecommandTag}
        />
      )}
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
      ? 'height:30%; align-items:center; '
      : 'height: 50%; flex-direction: row'}
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
    isPreview ? 'padding: 0 5rem 2rem 5rem;' : 'padding: 3rem 5rem;'}
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
