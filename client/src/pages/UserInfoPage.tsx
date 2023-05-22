import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserTitle from '../components/UserInfo/UserTitle';
import UserEditInfo from '../components/UserInfo/UserEditInfo';
import UserInfoList from '../components/UserInfo/UserInfoList';

const UserInfoPage = () => {

  const [ isEditClick, setIsEditClick ] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <StyledMyPageWrapper>
      <StyledMyPageContain>
      {isEditClick ? (
          <UserEditInfo setIsEditClick={setIsEditClick} />
        ) : (
          <UserTitle setIsEditClick={setIsEditClick} />
        )}
        {
          windowWidth > 650 || !isEditClick 
          ? <UserInfoList /> 
          : null
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
  @media screen and (max-width: 650px) {
    flex-direction: column;
  };
`;