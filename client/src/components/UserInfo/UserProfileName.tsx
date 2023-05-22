import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const UserProfileName = ({ isUserName, isUserEmail } : { isUserName: string, isUserEmail: string }) => {

  const [ isSameUser, setIsSameUser ] = useState<boolean>(false);
  const { memberId } = useParams();

  useEffect(() => {
    const getMemberData = localStorage.getItem('user');
    const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
    const loginId = memberData.memberId;

    if (loginId.toString() === memberId) {
      setIsSameUser(true);
    };

  } , [memberId]);

  return (
    <StyledWrapper>
      {isUserName}
      <StyledEmail>
        {isSameUser && isUserEmail}
      </StyledEmail>
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