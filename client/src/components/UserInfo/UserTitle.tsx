import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import UserProfileImg from './UserProfileImg';
import UserProfileName from './UserProfileName';
import UserAboutMe from './UserAboutMe';
import UserProfileAction from './UserActions';
import Loading from '../common/Loading';
import { UserInfoProps } from '../../types/propsTypes';

const UserTitle = ({ setIsEditClick }: UserInfoProps) => {
  const { memberId } = useParams();

  const [isUserImg, setIsUserImg] = useState<string>('');
  const [isUserName, setIsUserName] = useState<string>('');
  const [isUserEmail, setIsUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members/${memberId}/profile`
        );
        const fetchedData = res.data.data;

        setIsUserImg(fetchedData.imageUrl);
        setIsUserName(fetchedData.userName);
        setIsUserEmail(fetchedData.email);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [memberId]);

  if (loading) {
    return <Loading />;
  }

  if (isUserName === null) {
    setIsUserName('등록된 닉네임이 없습니다.');
  }

  return (
    <StyledTitleWrapper>
      <UserProfileImg isUserImg={isUserImg} />
      <UserProfileName isUserName={isUserName} isUserEmail={isUserEmail} />
      <UserProfileAction setIsEditClick={setIsEditClick} />
      <StyledAboutMe>
        <UserAboutMe />
      </StyledAboutMe>
    </StyledTitleWrapper>
  );
};

export default UserTitle;

export const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;

export const StyledAboutMe = styled.div`
  @media screen and (max-width: 650px) {
    display: none;
  }
`;
