import React, { useState } from 'react';
import styled from 'styled-components';
import UserTitle from '../components/UserInfo/UserTitle';
import UserEditInfo from '../components/UserInfo/UserEditInfo';

const UserInfoPage = () => {

  const [ isEditClick, setIsEditClick ] = useState<boolean>(false);

  return (
    <StyledMyPageWrapper>
      <StyledMyPageContain>
      {
        isEditClick ? 
          <UserEditInfo setIsEditClick={setIsEditClick} />
        : <UserTitle setIsEditClick={setIsEditClick} />
      }
      </StyledMyPageContain>
    </StyledMyPageWrapper>
  );
};

export default UserInfoPage;

const StyledMyPageWrapper = styled.div`
  background-color: var(--page-bg);
  width: 100%;
  min-height: calc(100vh - 224px);
  flex-grow: 1;
  overflow-x: hidden;
`;

const StyledMyPageContain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0px;
  display: flex;
  justify-content: left;
  flex-direction: row;
  gap: 20px;
`;