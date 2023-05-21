import React from 'react';
import styled from 'styled-components';
import MyTitle from '../components/UserInfo/UserTitle';

const UserInfoPage = () => {
  return (
    <StyledMyPageWrapper>
      <StyledMyPageContain>
        <MyTitle />
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