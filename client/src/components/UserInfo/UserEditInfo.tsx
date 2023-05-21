import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserProfileImg from './UserProfileImg';
import UserProfileName from './UserProfileName';
import UserAboutMe from './UserAboutMe';
import { StyledTitleWrapper, StyledAboutMe } from './UserTitle';
import CreateChannelButton from '../ui/CreateChannelButton';
import { CiCircleRemove } from 'react-icons/ci';

const UserEditInfo = () => {
  
  const { memberId } = useParams();
  const [ isUserImg, setIsUserImg ] = useState<string>('');
  const [ isUserName, setIsUserName ] = useState<string>('');
  const [ isUserEmail, setIsUserEmail ] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/profile`);
        const fetchedData = res.data.data;

        setIsUserImg(fetchedData.imageUrl);
        setIsUserName(fetchedData.userName);
        setIsUserEmail(fetchedData.email);

      } catch (error) {
        console.log(error);
      };
    };

    fetchUserData();
  } , [memberId]);

  if (isUserName === null) {
    setIsUserName('등록된 닉네임이 없습니다.');
  };

  const handleSubmitEditClick = () => {
    console.log('post 요청 보내기');
  };

  const handleCancleClick = () => {
    window.location.reload();
  };

  return (
    <StyledTitleWrapper>
      <UserProfileImg isUserImg={isUserImg} />
      <UserProfileName isUserName={isUserName} isUserEmail={isUserEmail} />
      <StyledActionContain>  
        <CreateChannelButton text={'프로필 저장하기'} onClick={handleSubmitEditClick}/>
        <StyledCancleContain>
          <CiCircleRemove onClick={handleCancleClick} />
        </StyledCancleContain>
      </StyledActionContain>
      <StyledEditAboutMe>
        <UserAboutMe />
      </StyledEditAboutMe>
      <p>회원탈퇴</p>
    </StyledTitleWrapper>
  );
};

export default UserEditInfo;

const StyledEditAboutMe = styled(StyledAboutMe)`
  @media screen and (max-width: 650px) {
    display: flex;
  }
`;

const StyledActionContain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledCancleContain = styled.div`
  color: var(--cyan-dark-800);
  font-size: 30px;
  cursor: pointer;
  &:hover {
    color: var(--button-inactive-hover-color);
  }
`;