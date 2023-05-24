import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PATH_URL from '../../constants/pathUrl';
import styled from 'styled-components';
import UserProfileImg from './UserProfileImg';
import { StyledFollowed } from './UserProfileName';
import { StyledItemWrapper } from '../CategoryGames/GameItem';
import { TbMessages } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { startChat } from '../../slice/chatSlice';

type UserItemPropsType = {

  imageUrl: string,
  userName: string,
  followerCount: number,
  followingCount: number,
  memberId: string,
  isFollowingIdIncluded: boolean | undefined,
};

const UserItem = ({
  imageUrl,
  userName,
  followerCount,
  followingCount,
  memberId,
  isFollowingIdIncluded
}: UserItemPropsType) => {
  const getMemberData = localStorage.getItem('user');

  const memberData = getMemberData
    ? JSON.parse(getMemberData)
    : { memberId: -1 };
  const loginedId = memberData.memberId;

  const sameItem = memberId === String(loginedId);

  const userNameState = userName.length >= 20
  ? '*삭제된 계정*'
  : userName;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMessage = () => {
    const receiver = {
      memberId,
      imageUrl,
      userName
    };

    dispatch(startChat(receiver));
  };

  const handleUserPageClick = () => {
    if (userNameState === '*삭제된 계정*') {
      alert('삭제된 계정입니다.');
    } else {
      navigate(`${PATH_URL.USER_INFO}${memberId}`);
      window.location.reload();
    }
  };

  const handleFollow = () => {
    if (Number(loginedId) !== -1) {
      const token = localStorage.getItem('access_token');
      if (isFollowingIdIncluded) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/api/members/${memberId}/unfollow`,
            {
              headers: {
                Authorization: `${token}`
              }
            }
          )
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => {
            console.error('언팔로우 요청 실패:', error);
          });
      }
      if (!isFollowingIdIncluded) {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/members/${memberId}/follow`,
            {},
            {
              headers: {
                Authorization: `${token}`
              }
            }
          )
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => {
            console.error('팔로우 요청 실패:', error);
          });
      };
    } else {
      alert('로그인이 필요한 기능입니다.');
    }
  };

  return (
    <StyledWrapper>
    <StyledContain onClick={handleUserPageClick}>
      <UserProfileImg isUserImg={imageUrl} />
        <StyledUserName>{userNameState}</StyledUserName>
        <StyledFollowed>
        <p>팔로워: {followerCount}</p>
        <p>팔로잉: {followingCount}</p>
      </StyledFollowed>
    </StyledContain>
    { !sameItem ? (
    <StyledRow>
      <StyledFollowButton
        onClick={handleFollow}
      >
        {isFollowingIdIncluded ? '팔로우 취소' : '팔로우 하기'}
      </StyledFollowButton>
      <StyledMessageContain>
        <TbMessages onClick={handleMessage} />
      </StyledMessageContain>
    </StyledRow>
    ) :  (
        <StyledFollowButton
          onClick={handleUserPageClick}
        >
        {'내 프로필보기'}
      </StyledFollowButton>
      )
    }
    </StyledWrapper>
  );
};

export default UserItem;

const StyledWrapper = styled(StyledItemWrapper)`
  display: flex;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  cursor: default;
  &:hover {
    color: #000;
  }
`;

const StyledContain = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
`;

const StyledUserName = styled.p`
  padding-top: 10px;
  font-size: 14px;
  padding: 0px 20px;
  margin-top: 15px;
  width: 100%;
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: center;
`;

const StyledFollowButton = styled.div`
  font-size: 14px;
  padding: 10px 15px;
  background-color: var(--cyan-light-700);
  border-radius: 15px;
  color: var(--cyan-light-100);
  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;
  &:hover {
    background-color: var(--button-inactive-hover-color);
  }
`;

const StyledMessageContain = styled.div`
  color: var(--cyan-dark-800);
  font-size: 35px;
  cursor: pointer;
  &:hover {
    color: var(--button-inactive-color);
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
`;
