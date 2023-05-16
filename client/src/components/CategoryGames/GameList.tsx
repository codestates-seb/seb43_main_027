import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GameItem from './GameItem';
import { dummyGamesData } from '../../data/dummyCategories';
import { type CategoryGameType } from '../../types/dataTypes';
import { type TabSelectType } from '../../types/propsTypes';
import axios from 'axios';

const GameList: React.FC<TabSelectType> = ({ isSelectTab })  => {

  // todo: 데이터가 많아질때, 조회는 무한스크롤
  const { categoryId } = useParams<{ categoryId: string}>();
  const memberId = useSelector((state: RootState) => state.user.memberId);
  const [ isFilteredGames, setIsFilteredGames ] = useState<CategoryGameType[]>([]);
  const [ userMessage, setUserMessage ] = useState('팔로우한 게임이 없습니다.');

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/${categoryId}/games`);
      
      const gamesData = res.data.data;
      // 더미데이터 테스트 코드
      // const gamesData = dummyGamesData.data;
      if (gamesData) {
        const filteredGames = gamesData
          .sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          if (isFilteredGames.length === 0) setUserMessage('등록된 게임채널이 없습니다.');
          
          switch (isSelectTab) {
            case '전체 게임':
              setIsFilteredGames([...filteredGames]);
              break;
            case '인기 게임': {
              const popularGames = filteredGames.filter((game: any) => game.followerCount >= 1);
              popularGames.sort((a: { followerCount: number }, b: { followerCount: number }) => b.followerCount - a.followerCount);
              setIsFilteredGames([...popularGames]);
              break;
            }
            case '신규 게임': {
              const currentDate = new Date();
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

              const newGames = filteredGames.filter((game: any) => {
                const createdAt = new Date(game.createdAt);
                return createdAt >= oneMonthAgo && createdAt <= currentDate;
              });
              setIsFilteredGames([...newGames]);
              break;
            }
            case '팔로우 게임':
              // todo: 팔로우 기능 구현시 데이터 추가하기
              if (memberId === -1) {
                setIsFilteredGames([]);
                setUserMessage('로그인이 필요한 기능입니다.');
              } else {
                setIsFilteredGames([]);
                setUserMessage('팔로우한 게임채널이 없습니다.');
              }
              break;
            default:
              setIsFilteredGames(filteredGames);
              break;
          }
      } else {
        // todo: 404페이지 경로로 이동 시키기
        // return navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }
    fetchGamesData();
  }, [isSelectTab, memberId]);

  return (
    <StyledGameList>
      {
        isFilteredGames.length > 0 ?
        isFilteredGames.map((item) => (
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
  min-height: 45vh;
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