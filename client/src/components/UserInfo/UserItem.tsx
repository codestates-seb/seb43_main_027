import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PATH_URL from '../../constants/pathUrl';
import styled from 'styled-components';
import axios from 'axios';
import UserProfileImg from './UserProfileImg';
import { StyledFollowed } from './UserProfileName';
import { StyledItemWrapper } from '../CategoryGames/GameItem';
import { TbMessages } from 'react-icons/tb';

type UserItemPropsType = {
  imageUrl: string;
  userName: string;
  followerCount: number;
  followingCount: number;
  isFollowed: boolean;
  memberId: string;
  setIsFollowClick: React.Dispatch<React.SetStateAction<boolean>>;
  isSameUser: boolean;
};

const UserItem = ({
  imageUrl,
  userName,
  followerCount,
  followingCount,
  isFollowed,
  memberId,
  setIsFollowClick,
  isSameUser
}: UserItemPropsType) => {
  const getMemberData = localStorage.getItem('user');
  const memberData = getMemberData
    ? JSON.parse(getMemberData)
    : { memberId: -1 };
  const logined = memberData.memberId;

  const sameItem = memberId === String(logined);

  const navigate = useNavigate();
  const handleFollow = () => {
    setIsFollowClick(true);
  };

  const handleMessage = () => {
    // todo: 해당 유저와 채팅창으로 이동하기
    console.log('해당 유저와 채팅창으로 이동');
  };

  const handleUserPageClick = () => {
    navigate(`${PATH_URL.USER_INFO}${memberId}`);
    window.location.reload();
  };

  console.log(sameItem);

  return (
    <StyledWrapper>
      <StyledContain onClick={handleUserPageClick}>
        <UserProfileImg isUserImg={imageUrl} />
        <StyledUserName>{userName}</StyledUserName>
        <StyledFollowed>
          <p>팔로워: {followerCount}</p>
          <p>팔로잉: {followingCount}</p>
        </StyledFollowed>
      </StyledContain>
      {!sameItem ? (
        <StyledRow>
          <StyledFollowButton onClick={handleFollow}>
            {isFollowed ? '팔로우' : '팔로잉'}
          </StyledFollowButton>
          <StyledMessageContain>
            <TbMessages onClick={handleMessage} />
          </StyledMessageContain>
        </StyledRow>
      ) : (
        <StyledFollowButton onClick={handleUserPageClick}>
          {'내 프로필보기'}
        </StyledFollowButton>
      )}
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
  font-size: 15px;
  padding: 10px 25px;
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
