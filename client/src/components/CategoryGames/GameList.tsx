import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GameItem from './GameItem';
import { type GameType } from '../../types/dataTypes';
import { type TabSelectType } from '../../types/propsTypes';
import { dummyGamesData } from '../../data/dummyCategories';

const GameList: React.FC<TabSelectType> = ({ isSelectTab })  => {

  const { categoryId } = useParams<{ categoryId: string}>();
  // const memberId = useSelector((state: RootState) => state.user.memberId);
  const getMemberData = localStorage.getItem('user');
  const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
  const memberId = memberData.memberId;

  const [ isFilteredGames, setIsFilteredGames ] = useState<GameType[]>([]);
  const [ userMessage, setUserMessage ] = useState('등록된 게임채널이 없습니다.');
  const [ isPage, setPage ] = useState<number>(1);
  const [ isSize, setSize ] = useState<number>(0);
  const [ isToTalSize, setTotalSize ] = useState<number>(0);

  // todo: 추후 데이터 생성 테스트시 인기,신규게임 페이지네이션 테스트 해야됨
  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        let apiUrl = `${process.env.REACT_APP_API_URL}/api/categories/${categoryId}/games?page=${isPage}`;
  
        switch (isSelectTab) {
          case '전체 게임': {
            const res = await axios.get(apiUrl);
            
            const gamesData = res.data.data.sort((a: { createdAt: string }, b: { createdAt: string }) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());  
            const pageInfo = res.data.pageInfo;

            setIsFilteredGames([...gamesData]);
            setSize(pageInfo.size);
            setTotalSize(pageInfo.totalSize);
            if (isFilteredGames.length === 0) setUserMessage('등록된 게임채널이 없습니다.');
            break;
          };
          case '인기 게임': {
            apiUrl += '&filter=POPULAR';
            const res = await axios.get(apiUrl);
            const popularGames = res.data.data.sort((a: {followerCount: number}, b: {followerCount: number}) => 
              b.followerCount - a.followerCount);
            const popularPageInfo = res.data.pageInfo;

            setIsFilteredGames([...popularGames]);
            setSize(popularPageInfo.size);
            setTotalSize(popularPageInfo.totalSize);
            if (isFilteredGames.length === 0) setUserMessage('등록된 게임채널이 없습니다.');
            break;
          };
          case '신규 게임': {
            apiUrl += '&filter=NEW';
            const res = await axios.get(apiUrl);
            const newGames = res.data.data.sort((a: { createdAt: string }, b: { createdAt: string }) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            const newGamesPageInfo = res.data.pageInfo;

            setIsFilteredGames([...newGames]);
            setSize(newGamesPageInfo.size);
            setTotalSize(newGamesPageInfo.totalSize);
            if (isFilteredGames.length === 0) setUserMessage('등록된 게임채널이 없습니다.');
            break;
          };
          case '팔로우 게임': {
            if (memberId === -1) {
              setIsFilteredGames([]);
              setUserMessage('로그인이 필요한 기능입니다.');
            } else {
              try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/mygame`);
                const data = res.data.data;
                const followedGames = data.filter((game:any) =>
                  game.categories.some((category:any) => category.categoryId?.toString() === categoryId)
                );

                if (followedGames.length > 0) {
                  setIsFilteredGames([...followedGames]);
                } else {
                  setIsFilteredGames([]);
                  setUserMessage('팔로우한 게임채널이 없습니다.');
                }
              } catch (error) {
                console.error(error);
              }
            }
            break;
          }
          default:
            setIsFilteredGames([]);
            break;
        }
      } catch (error) {
        // TODO: 404페이지 경로로 이동 시키기
        // return navigate('/');
        console.error(error);
      }
    };

    fetchGamesData();

  }, [isSelectTab, memberId, isPage]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <StyledGameListWrapper>
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
      {
        isFilteredGames.length > 0 &&
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
      }
    </StyledGameListWrapper>
  );
};

export default GameList;

const StyledGameListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const StyledPagination = styled.div`
  padding: 0px 30px 50px 30px;
`;