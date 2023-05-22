import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UserProfileType } from '../../types/propsTypes';

const UserProfileName = ({ 
  isUserName,
  isUserEmail,
  isFollowerCount,
  isFollowingCount
} : UserProfileType ) => {

  const [ isSameUser, setIsSameUser ] = useState<boolean>(false);
  const { memberId } = useParams();

  useEffect(() => {
    const getMemberData = localStorage.getItem('user');
    const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
    const loginId = memberData.memberId;

    if (loginId.toString() === memberId) {
      setIsSameUser(true);
    } else {
      setIsSameUser(false);
    };

  } , [memberId]);

  return (
    <StyledWrapper>
      {isUserName}
      <StyledEmail>
        {isSameUser && isUserEmail}
      </StyledEmail>
      <StyledFollowed>
        <p>팔로워: {isFollowerCount}</p>
        <p>팔로잉: {isFollowingCount}</p>
      </StyledFollowed>
    </StyledWrapper>
  );
};

export default UserProfileName;


const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  margin-top: 10px;
  gap: 10px;
  width: 300px;
`;

const StyledEmail = styled.p`
  font-size: 14px;
  color: var(--cyan-light-700);
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const StyledFollowed = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-top: 10px;
  font-size: 13px;
  color: var(--sub-text-color);
`;