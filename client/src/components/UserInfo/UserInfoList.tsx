import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserItem from './UserItem';
import GameItem from '../CategoryGames/GameItem';
import PostItem from '../GameChannel/PostItem';
import { GamePagePostType, GameType } from '../../types/dataTypes';

type FollowerType = {
    memberId: number,
    email: string,
    userName: string,
    imageUrl: string,
    followerCount: number,
    followingCount: number,
  };

const UserInfoList = ({ isSelectTab, isSameUser, isSelectTag, isMappingTag }
  : { isSelectTab: string, isSameUser: boolean, isSelectTag: string, isMappingTag: string }) => {

  const { memberId } = useParams();
  const getMemberData = localStorage.getItem('user');
  const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
  const loginedId = memberData.memberId;

  const [ isFollowedList, setIsFollowedList ] = useState<FollowerType[]>([]);

  const [ isMyFollowingList, setIsMyFollowingList ] = useState<number[]>([]);

  const [ isFollowedGames, setIsFollowedGames ] = useState<GameType[]>([]);
  const [ isFilteredPosts, setIsFilteredPosts ] = useState<GamePagePostType[]>([]);
  const [ userMessage, setUserMessage ] = useState('');
  const [ isBookmarkedList, setIsBookmarkedList ] = useState<number[]>([]);
  const [ isBookmarkLists, setIsBookmarkLists ] = useState<GamePagePostType[]>([]);
  const [ isBookmarkClick, setIsBookmarkClick ] = useState(false);
  const [ isTotalCount, setIsTotalCount ] = useState<number>(-1);

  useEffect(() => {
    if (Number(memberId) !== -1) {
      const MyFollowingData = async () => {
        
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${loginedId}/following`);
          const followData = res.data.data;
          const followingIdList = followData.map((item:any) => item.memberId);
          setIsMyFollowingList([...followingIdList]);

        } catch (error) {
          console.log(error);
        };
      };
        MyFollowingData();
      };
  }, [loginedId, memberId]);

  useEffect(() => {
    if (Number(memberId) !== -1) {
    const BookmarkedData = async () => {
      let apiUrl = '';
      if (isSelectTag !== '전체') {
        apiUrl = `?postTag=${isMappingTag}`;
      }
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${loginedId}/bookmark${apiUrl}`, {
          headers: {
            Authorization: `${localStorage.getItem('access_token')}`,
          }
        });
        const fetchedData = res.data.data;
        if (isBookmarkClick) setIsTotalCount(fetchedData.length);
        setIsBookmarkLists([...fetchedData]);

        const postIdList = fetchedData.map((post:any) => post.postId);
        setIsBookmarkedList([...postIdList]);

      } catch (error) {
        console.log(error);
      };
    };
      BookmarkedData();
    };

  }, [loginedId, memberId, isSelectTag]);

  useEffect(() => {
    const currentId = isSameUser ? Number(loginedId) : memberId;

    const fetchPostsData = async () => {
        switch (isSelectTab) {
          case '팔로워': {
            setIsFollowedGames([]);
            setIsFilteredPosts([]);
            setIsBookmarkClick(false);
            try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/members/${currentId}/follower`;
            const res = await axios.get(apiUrl);
            const followData = res.data.data;
            setIsTotalCount(followData.length);
            if (followData.length > 0) {
              setIsFollowedList([...followData]);
            } else {
              setIsFollowedList([]);
              setUserMessage('인디버디에서 다양한 게임버디를 찾아보세요!');
            }
            
            } catch (error) {
              console.log(error);
            };
            break;
          };
          case '팔로잉': {
            setIsFollowedGames([]);
            setIsFilteredPosts([]);
            setIsBookmarkClick(false);
            setIsTotalCount(-1);
            try {
              const apiUrl = `${process.env.REACT_APP_API_URL}/api/members/${currentId}/following`;
              const res = await axios.get(apiUrl);
              const followData = res.data.data;
              setIsTotalCount(followData.length);
              if (followData.length > 0) {
                setIsFollowedList([...followData]);
              } else {
                setIsFollowedList([]);
                setUserMessage('인디버디에서 다양한 게임버디를 찾아보세요!');
              }

              } catch (error) {
                console.log(error);
              };
              break;
          };
          case '팔로우 게임': {
            setIsFollowedList([]);
            setIsFilteredPosts([]);
            setIsBookmarkClick(false);
              try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${currentId}/mygame`);
                const followedGames = res.data.data;
                setIsTotalCount(followedGames.length);
                if (followedGames.length > 0) {
                  setIsFollowedGames([...followedGames]);
                } else {
                  setIsFollowedGames([]);
                  setUserMessage('팔로우한 게임채널이 없습니다.');
                }
              } catch (error) {
                console.error(error);
                }
            break;
          };
          case '작성글': {
            setIsFollowedGames([]);
            setIsFollowedList([]);
            setIsBookmarkClick(false);
            let apiUrl = '';
            if (isSelectTag !== '전체') {
              apiUrl = `?postTag=${isMappingTag}`;
            }
            try {
              const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${currentId}/mypost${apiUrl}`);
              const followedPosts = res.data.data;
              setIsTotalCount(followedPosts.length);
              if (followedPosts.length > 0) {
                setIsFilteredPosts([...followedPosts]);
              } else {
                setIsFilteredPosts([]);
                setUserMessage('작성한 게시글이 없습니다.');
              }
            } catch (error) {
              console.error(error);
            }
            break;
          };
          case '북마크 글': {
            setIsFollowedGames([]);
            setIsFollowedList([]);
            setIsBookmarkClick(true);
            setIsTotalCount(isBookmarkLists.length);
            setUserMessage('북마크한 게시글이 없습니다.');
            break;
          }
          default:
            setIsFollowedList([]);
            setIsFollowedGames([]);
            setIsFilteredPosts([]);
            setIsTotalCount(0);
            break;
        };
    };
    fetchPostsData();

  }, [isSelectTab, memberId, isSameUser, isSelectTag]);

  const isPostIdIncluded = (postId: number) => {
    return isBookmarkedList.includes(postId);
  };

  const isFollowingIdIncluded = (memberId: number) => {
    return isMyFollowingList.includes(memberId);
  };

  const isEmptyItem = isTotalCount === 0;

  return (
    <StyledWrapper>
    <StyledCol>
      <StyledTotalNumber>
      {isSelectTab} 수: {isTotalCount}
      </StyledTotalNumber>
      <StyledRow>
        { 
          isFollowedList && isFollowedList.length > 0 &&
          isFollowedList.map((item, index) => {
            return (
              <UserItem 
                key={index}
                imageUrl={item.imageUrl}
                userName={item.userName}
                followerCount={item.followerCount}
                followingCount={item.followingCount}
                memberId={String(item.memberId)}
                isFollowingIdIncluded={isFollowingIdIncluded(item.memberId)}
              />
            )}
          )
        }
        { 
          isFollowedGames && isFollowedGames.length > 0 &&
          isFollowedGames.map((item, index) => {
            return (
              <GameItem 
                key={index}
                gameId={item.gameId}
                gameName={item.gameName}
                followerCount={item.followerCount}
                categories={item.categories}
                mainImgUrl={item.mainImgUrl}
              />
            )}
          )
        }
        {
          !isBookmarkClick &&
          isFilteredPosts && isFilteredPosts.length > 0 && (
          isFilteredPosts.map((post, index) => (
            <PostItem
              gameId={post.gameId}
              key={index}
              postId={post.postId}
              userName={post.userName}
              title={post.title}
              views={post.views}
              postTag={post.postTag}
              commentCount={post.commentCount}
              likeCount={post.likeCount}
              createdAt={post.createdAt}
              isPostIdIncluded={isPostIdIncluded(post.postId)}
            />
          ))
        )}
        {
          isBookmarkClick &&
          isBookmarkLists.length > 0 && (
          isBookmarkLists.map((post, index) => (
            <PostItem
              gameId={post.gameId}
              key={index}
              postId={post.postId}
              userName={post.userName}
              title={post.title}
              views={post.views}
              postTag={post.postTag}
              commentCount={post.commentCount}
              likeCount={post.likeCount}
              createdAt={post.createdAt}
              isPostIdIncluded={isPostIdIncluded(post.postId)}
            />
          ))
        )
      }
      {
        isEmptyItem && (
          <StyledEmptyItem>
            {userMessage}
          </StyledEmptyItem>
        )
      }
      </StyledRow>
      </StyledCol>
    </StyledWrapper>
  );
};

export default UserInfoList;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  position: relative;
  justify-content: left;
  gap: 25px;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 100%;
  min-height: 45vh;
  @media screen and (max-width: 650px) {
    flex-wrap: wrap;
    justify-content: center;
    flex-basis: 50%;
    padding: 35px 10px;
  }
`;
const StyledCol = styled.div`
  font-size: 14px;
`;

const StyledTotalNumber = styled.div`
  color: var(--category-tag-bg-default);
`;

const StyledRow = styled.div`
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: left;
  gap: 30px;
  display: flex;
  @media screen and (max-width: 650px) {
    justify-content: flex-start;
  }
`;

const StyledEmptyItem = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 50px;
  font-size: 18px;
  font-weight: 700;
  color: var(--default-text-color);
  @media screen and (max-width: 650px) {
    width: 80vw;
    margin: 20px;
    position: relative;
  }
`;