import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';
import { dummyGamesData } from '../../data/dummyCategories';
import CategoryTag from '../common/CategoryTag';
import CreateChannelButton from '../ui/CreateChannelButton';

// todo: 게임 팔로우 기능 추가, 게임아이디에 맞게 게임 데이터 패칭, 경로 쿼리 재설정

const GameTitle = ()  => {
  
  const { gameId } = useParams();
  const memberId = useSelector((state: RootState) => state.user.memberId);

  const navigate = useNavigate();
  const filteredGames = dummyGamesData.data.find((item) => item.gameId.toString() === gameId);
  const followNumber = filteredGames?.followerCount; // 팔로우 기능추가 (버튼클릭시 텍스트변경)

  if (!filteredGames) {
    // 게임이 없을때 404페이지로 변경
    return <div>게임을 찾을 수 없습니다.</div>
  }

  const currentGameData = filteredGames.categories;

  const handleFollow = () => {
    if (memberId === -1) {
      navigate('/login');
    } else {
      console.log('게임 팔로우 기능 추가');
    }
  }

  return (
    <StyledTitleWrapper>
      <StlyedGameImg 
        src={filteredGames.mainImgUrl}
        alt='game-image'
      />
      <StyledGameName>
        {filteredGames.gameName}
      </StyledGameName>
      <StyledTagContain>
      {
        currentGameData.map((item, index) => (
          <CategoryTag 
            key={index}
            categoryId={index}
            categoryName={item.categoryName}
          />
        ))
      }
      </StyledTagContain>
      <StyledFollowContain>
      <Link to={`/games/${gameId}/follower`} >
        <StyledFollowNumber>
          게임 팔로워: {followNumber}
        </StyledFollowNumber>
      </Link>
        <CreateChannelButton 
          text='게임 팔로우' 
          onClick={handleFollow}
        />
      </StyledFollowContain>
    </StyledTitleWrapper>
  );
};

export default GameTitle;

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 650px) {
    padding-bottom: 30px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StlyedGameImg = styled.img`
  width: 300px;
  height: 250px;
  border-radius: 15px;
  margin-top: 50px;
  @media screen and (max-width: 650px) {
    margin-top: 30px;
  }
`

const StyledGameName = styled.h3`
  margin-top: 10px;
  font-size: 28px;
  font-weight: 700;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const StyledTagContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

const StyledFollowContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15%;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: var(--cyan-dark-800);
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 20px;
  @media screen and (max-width: 650px) {
    width: 80%;
  }
`;

const StyledFollowNumber = styled.p`
  cursor: pointer;
  &:hover {
    color: var(--cyan-dark-700);
  }
`