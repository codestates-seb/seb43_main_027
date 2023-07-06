import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserTitle from '../components/UserInfo/UserTitle';
import UserEditInfo from '../components/UserInfo/UserEditInfo';
import UserInfoTap from '../components/UserInfo/UserInfoTap';
import UserInfoList from '../components/UserInfo/UserInfoList';
import { StyledMainContent } from './GameChannel';
import { otherInfoTab } from '../data/filterTabList';

const UserInfoPage = () => {
  const { memberId } = useParams();
  const [isEditClick, setIsEditClick] = useState<boolean>(false);
  const [isSameUser, setIsSameUser] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isSelectTab, setIsSelectTab] = useState<string>(otherInfoTab[0]);
  const [isSelectTag, setIsSelectTag] = useState<string>('전체');
  const [isMappingTag, setIsMappingTag] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const getMemberData = localStorage.getItem('user');
    const memberData = getMemberData
      ? JSON.parse(getMemberData)
      : { memberId: -1 };
    const loginId = memberData.memberId;

    if (loginId.toString() === memberId) {
      setIsSameUser(true);
    } else {
      setIsSameUser(false);
    }
  }, [memberId]);

  return (
    <StyledMyPageWrapper>
      <StyledMyPageContain>
        {isEditClick ? (
          <UserEditInfo setIsEditClick={setIsEditClick} />
        ) : (
          <UserTitle setIsEditClick={setIsEditClick} />
        )}
        {windowWidth > 650 || !isEditClick ? (
          <StyledContain>
            <UserInfoTap
              isSameUser={isSameUser}
              setIsSelectTab={setIsSelectTab}
              isSelectTab={isSelectTab}
              setIsSelectTag={setIsSelectTag}
              setIsMappingTag={setIsMappingTag}
            />
            <UserInfoList
              isSelectTab={isSelectTab}
              isSameUser={isSameUser}
              isSelectTag={isSelectTag}
              isMappingTag={isMappingTag}
            />
          </StyledContain>
        ) : null}
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
  }
`;

const StyledContain = styled(StyledMainContent)`
  display: flex;
  flex-direction: column;
  margin-top: -10px;
  @media screen and (max-width: 650px) {
    margin-top: -20px;
  }
`;
