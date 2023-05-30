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
import DefaultGame from '../../asset/DefaultGame.png';
import ComponentWithModal from '../common/ComponentWithModal';
import { Tooltip } from 'antd';

const GameTitle = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const getMemberData = localStorage.getItem('user');
  const memberData = getMemberData
    ? JSON.parse(getMemberData)
    : { memberId: -1 };
  const memberId = memberData.memberId;

  const [isGameData, setIsGameData] = useState<GameType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      navigate(`${PATH_URL.LOGIN}`);
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
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/games/${gameId}/follow`,
            {},
            {
              headers: {
                Authorization: `${token}`
              }
            }
          )
          .then((response) => {
            setIsFollowed(true);
          })
          .catch((error) => {
            console.error('팔로우 요청 실패:', error);
          });
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handlemoveClick = () => {
    if (!emptyUrl) {
      window.open(isGameData.downloadUrl, '_blank');
    } else {
      alert('경로가 비어있습니다.');
    }
  };

  const defaultImg =
    isGameData?.mainImgUrl ===
    'https://codejejus-deploy.s3.ap-northeast-2.amazonaws.com/images/defaultGameImg.png';
  const emptyUrl = isGameData.downloadUrl.length === 0;

  console.log(isGameData);

  const defaultDescription = 
  isGameData.description === null ? '게임 소개글이 없습니다.' : isGameData.description;

  return (
    <StyledTitleWrapper>
      {imageError || defaultImg ? (
        <StyledGameImg src={DefaultGame} alt='default-game-image' />
      ) : (
        <StyledGameImg
          src={isGameData?.mainImgUrl}
          alt='game-image'
          onError={handleImageError}
        />
      )}
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
            <Tooltip placement="bottom" title={'이 게임을 팔로우한 유저보기'}>
              게임 팔로워: {isGameData?.followerCount}
            </Tooltip>
          </StyledFollowNumber>
        </Link>
        <CreateChannelButton
          text={isFollowed ? '팔로우 취소' : '게임 팔로우'}
          onClick={handleFollow}
        />
      </StyledFollowContain>
      <StyledDownload>
        {!emptyUrl ? (
          <ComponentWithModal
            confirmMessage={`다운로드 링크가 정확하지 않을 수 있습니다.
            \n그래도 이동하시겠습니까?`}
            confirmOnClick={handlemoveClick}
          >
            <Tooltip placement="bottom" title={'게임 다운로드 링크로 이동'}>
            <StyldedLink
            >
              {
                emptyUrl
                ? '다운로드 링크가 비어있습니다.'
                : '게임플레이 하러가기'
              }
            </StyldedLink>
            </Tooltip>
          </ComponentWithModal>
        ) : (
          <StyldedLink>
            {emptyUrl
              ? '다운로드 링크가 비어있습니다.'
              : isGameData.downloadUrl}
          </StyldedLink>
        )}
      </StyledDownload>
      <StyledDescription>
        {defaultDescription}
      </StyledDescription>
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
    padding-top: 0px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StyledGameImg = styled.img`
  width: 300px;
  height: 250px;
  border-radius: 15px;
  margin-top: 50px;
  @media screen and (max-width: 650px) {
    margin-top: 30px;
  }
`;

const StyledGameName = styled.h3`
  display: flex;
  justify-content: left;
  flex-direction: row;
  margin-top: 10px;
  font-size: 28px;
  font-weight: 700;
  width: 300px;
  word-break: keep-all;
  overflow-wrap: break-word;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;

const StyledTagContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding-top: 10px;
  padding-left: 30px;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  & > a {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 650px) {
    padding-left: 0px;
    justify-content: center;
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
    color: var(--cyan-dark-500);
  }
`;

const StyledDownload = styled.div`
  font-size: 16px;
  p:hover {
    color: var(--cyan-dark-500);
  }
`;

const StyldedLink = styled.p`
  cursor: pointer;
  color: var(--cyan-dark-700);
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const StyledDescription = styled.div`
  width: 400px;
  font-size: 14px;
  color: var(--category-tag-bg-default);
  word-break: keep-all;
  overflow-wrap: break-word;
  min-height: 100px;
  max-height: 200px;
  overflow-y: scroll;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  padding: 20px 30px;
  background-color: #fff;
  margin-top: 10px;
  line-height: 1.5;
  @media screen and (max-width: 650px) {
    height: 100px;
  }
`;