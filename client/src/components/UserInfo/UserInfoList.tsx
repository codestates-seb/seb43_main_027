import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserItem from './UserItem';

type followerType = {
    memberId: number,
    email: string,
    userName: string,
    imageUrl: string,
    followerCount: number,
    followingCount: number,
  };

const UserInfoList = ({ isSelectTab, isSameUser }
  : { isSelectTab: string, isSameUser: boolean }) => {

  const { memberId } = useParams();
  const getMemberData = localStorage.getItem('user');
  const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
  const loginedId = memberData.memberId;

  const [ isFollowClick, setIsFollowClick ] = useState(false);
  const [ isFollowedList, setIsFollowedList ] = useState<followerType[]>([]);

  useEffect(() => {
    const fetchPostsData = async () => {
        switch (isSelectTab) {
          case '팔로워': {
            console.log(isSameUser)
            try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/members/${isSameUser ? Number(loginedId) : memberId }/follower`;
            console.log(apiUrl);
            const res = await axios.get(apiUrl);
            const followData = res.data.data;
            setIsFollowedList([...followData]);
            console.log(apiUrl);
            } catch (error) {
              console.log(error);
            };
            break;
          };
          case '팔로잉': {
            try {
              const apiUrl = `${process.env.REACT_APP_API_URL}/api/members/${isSameUser ? Number(loginedId) : memberId }/following`;
              const res = await axios.get(apiUrl);
              const followData = res.data.data;
              setIsFollowedList([...followData]);
              } catch (error) {
                console.log(error);
              };
              break;
          };
          default:
            break;
        };
    };
    fetchPostsData();

  }, [isSelectTab, memberId, isSameUser]);

  console.log(isFollowedList);

  return (
    <StyledWrapper>
    <StyledCol>
      <StyledTotalNumber>
      {isSelectTab} 수: {isFollowedList.length}
      </StyledTotalNumber>
      <StyledRow>
      { isFollowedList.map((item, index) => {
        return (
          <UserItem 
            key={index}
            imageUrl={item.imageUrl}
            userName={item.userName}
            followerCount={item.followerCount}
            followingCount={item.followingCount}
            isFollowed={true}
            memberId={String(item.memberId)}
            setIsFollowClick={setIsFollowClick}
            isSameUser={isSameUser}
          />
        );
      })}
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
    flex-basis: 50%;
    padding: 35px 35px;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 30px;

  @media screen and (max-width: 650px) {
    justify-content: flex-start;
  }
`;