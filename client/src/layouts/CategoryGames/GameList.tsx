import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GameItem from './GameItem';
import { dummyCategoriesGames } from '../../data/dummyCategories';

interface Props {
  isSelectTab: string;
};

const GameList: React.FC<Props> = ({ isSelectTab })  => {

  // todo: 전체게임, 인기게임, 신규게임, 팔로우게임 필터링 조건 추가
  // 전체데이터 받아올때 생성시간 데이터 추가가 필요함
  // 조회는 무한스크롤
  const { categoryId } = useParams<{ categoryId: string}>();
  const memberId = useSelector((state: RootState) => state.user.memberId);

  const filteredGames = dummyCategoriesGames.data
    .filter((game) => game.categories.some((category) => category.categoryId.toString() === categoryId));
  
  const [ isFilteredGames, setIsFilteredGames ] = useState(filteredGames);
  const [ userMessage, setUserMessage ] = useState('팔로우한 게임이 없습니다.');

  useEffect(() => {
    switch (isSelectTab) {
      case '전체 게임':
        // 채널 생성 시간 데이터 있어야됨
        setIsFilteredGames(filteredGames);
        break;
      case '인기 게임':
        setIsFilteredGames([...filteredGames].sort((a, b) => b.followerCount - a.followerCount))
        break;
      case '최신 게임':
        // 채널 생성 시간 데이터 있어야됨
        setIsFilteredGames(filteredGames);
        break;
      case '팔로우 게임':
        // 팔로우 기능 구현시 데이터 추가하기
        if (memberId === -1) {
          setIsFilteredGames([]);
          setUserMessage('로그인이 필요한 기능입니다.');
        } else {
          setIsFilteredGames([]);
        }
        break;
      default:
        setIsFilteredGames(filteredGames);
        break;
    }

  }, [isSelectTab, memberId]);

  return (
    <StyledGameList>
      {
        isFilteredGames.length > 0 ?
        isFilteredGames.map((item, index) => (
          <GameItem
            key={item.gameId}
            gameId={item.gameId}
            gameName={item.gameName}
            followerCount={item.followerCount}
            categories={item.categories}
            mainImgUrl={item.mainImgUrl}
          />
        )) : 
        <StyledEmptyItem>
          {userMessage}
        </StyledEmptyItem>
      }
    </StyledGameList>
  );
};

export default GameList;

const StyledGameList = styled.div`
  display: flex;
  width: 100%;
  padding: 50px;
  position: relative;
  align-items: flex-start;
  gap: 25px;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 100%;
  @media screen and (max-width: 650px) {
    flex-wrap: wrap;
    flex-basis: 50%;
    padding: 50px 35px;
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