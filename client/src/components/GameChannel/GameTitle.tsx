import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { type GameType } from '../../types/dataTypes';
import CategoryTag from '../common/CategoryTag';
import CreateChannelButton from '../ui/CreateChannelButton';
import PATH_URL from '../../constants/pathUrl';
import categoryData from '../../data/categoryData';

const GameTitle = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const getMemberData = localStorage.getItem('user');
  const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
  const memberId = memberData.memberId;

  const [isGameData, setIsGameData] = useState<GameType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/games/${gameId}`
        );
        const gameData = res.data.data;
        setIsGameData(gameData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [gameId, isFollowed]);

  useEffect(() => {
    const fetchFollowerData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members/${memberId}/mygame`
        );
        const followedData = res.data.data;
        setIsFollowed(
          followedData.some((game: any) => game.gameId.toString() === gameId)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowerData();
  }, [memberId]);

  if (loading) {
    return <Loading />;
  }

  if (!isGameData) {
    // 404페이지로 이동하기
    return <div>게임을 찾을 수 없습니다.</div>;
  }

  const handleFollow = () => {
    if (memberId === -1) {
      navigate('/login');
    } else {
      const token = localStorage.getItem('access_token');
      if (isFollowed) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/api/games/${gameId}/unfollow`,
            {
              headers: {
                Authorization: `${token}`
              }
            }
          )
          .then((response) => {
            setIsFollowed(false);
          })
          .catch((error) => {
            console.error('언팔로우 요청 실패:', error);
          });
      }
      if (!isFollowed) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/games/${gameId}/follow`, {}, {
          headers: {
            Authorization: `${token}`
          }
        })
        .then(response => {
          setIsFollowed(true);
        })
        .catch(error => {
          console.error('팔로우 요청 실패:', error);
        });
      }
    }
  };

  return (
    <StyledTitleWrapper>
      <StlyedGameImg src={isGameData?.mainImgUrl} alt='game-image' />
      <StyledGameName>{isGameData?.gameName}</StyledGameName>
      <StyledTagContain>
        {isGameData?.categories?.map((item, index) => (
          <Link to={`${PATH_URL.CATEGORY}${item.categoryId}`} key={index}>
            <CategoryTag
              categoryId={item.categoryId}
              categoryName={categoryData[item.categoryName].text}
            />
          </Link>
        ))}
      </StyledTagContain>
      <StyledFollowContain>
        <Link to={`${PATH_URL.GAME}${gameId}/follower`}>
          <StyledFollowNumber>
            게임 팔로워: {isGameData?.followerCount}
          </StyledFollowNumber>
        </Link>
        <CreateChannelButton
          text={isFollowed ? '팔로우 취소' : '게임 팔로우'}
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
`;

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
  padding-top: 10px;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  & > a {
    margin-bottom: 20px;
  }
`;

const StyledFollowContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15%;
  width: 100%;
  font-size: 16px;
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
`;
