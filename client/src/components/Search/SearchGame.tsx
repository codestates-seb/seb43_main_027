import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { type GameType } from '../../types/dataTypes';

import GameItem from '../CategoryGames/GameItem';

interface SearchGameType {
  isSelectTab: '전체' | '게임';
  searchGameInfo: GameType[];
}

interface SearchGameWrapperType {
  isPreview: boolean;
}

const SearchGame = ({ isSelectTab, searchGameInfo }: SearchGameType) => {
  return (
    <StyledSearchGameWrapper isPreview={isSelectTab === '전체' ? true : false}>
      {searchGameInfo.length > 0 ? (
        isSelectTab === '전체' ? (
          searchGameInfo
            .slice(0, 5)
            .map((item) => (
              <GameItem
                key={item.gameId}
                gameId={item.gameId}
                gameName={item.gameName}
                followerCount={item.followerCount}
                categories={item.categories}
                mainImgUrl={item.mainImgUrl}
              />
            ))
        ) : (
          searchGameInfo.map((item) => (
            <GameItem
              key={item.gameId}
              gameId={item.gameId}
              gameName={item.gameName}
              followerCount={item.followerCount}
              categories={item.categories}
              mainImgUrl={item.mainImgUrl}
            />
          ))
        )
      ) : (
        <StyledEmptyItem>검색 결과가 없습니다.</StyledEmptyItem>
      )}
    </StyledSearchGameWrapper>
  );
};

export default SearchGame;

const StyledSearchGameWrapper = styled.div<SearchGameWrapperType>`
  display: flex;
  flex-direction: ${(p) => (p.isPreview ? 'row' : 'column')};
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
