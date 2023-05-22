import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import UserProfileImg from './UserProfileImg';
import UserProfileName from './UserProfileName';
import UserAboutMe from './UserAboutMe';
import UserProfileAction from './UserActions';
import Loading from '../common/Loading';
import { UserInfoProps } from '../../types/propsTypes';
import PATH_URL from '../../constants/pathUrl';

const UserTitle = ({ setIsEditClick }: UserInfoProps) => {

  const { memberId } = useParams();
  const navigate = useNavigate();
  const [ isUserImg, setIsUserImg ] = useState<string>('');
  const [ isUserName, setIsUserName ] = useState<string>('');
  const [ isUserEmail, setIsUserEmail ] = useState<string>('');
  const [ isFollowerCount, setIsFollowerCount ] = useState<number>(0);
  const [ isFollowingCount, setIsFollowingCount ] = useState<number>(0);
  const [ loading, setLoading ] = useState(true);
  const [ isFollowClick, setIsFollowClick ] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}/profile`);
        const fetchedData = res.data.data;

        setIsUserImg(fetchedData.imageUrl);
        setIsUserName(fetchedData.userName);
        setIsUserEmail(fetchedData.email);
        setIsFollowerCount(fetchedData.followerCount);
        setIsFollowingCount(fetchedData.followingCount);

        if (fetchedData.userName === null) {
          setIsUserName('등록된 닉네임이 없습니다.');
        };
        
        if (fetchedData.memberStatus === 'DELETE') {
          alert('삭제된 계정입니다.');
          navigate(`${PATH_URL.ERROR}`);
        };

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      };
    };

    fetchUserData();
    setIsFollowClick(undefined);

  } , [memberId, isFollowClick]);

  if (loading) {
    return <Loading />;
  };

  return (
    <StyledTitleWrapper>
      <UserProfileImg isUserImg={isUserImg} />
      <UserProfileName 
        isUserName={isUserName} 
        isUserEmail={isUserEmail}
        isFollowerCount={isFollowerCount}
        isFollowingCount={isFollowingCount}
      />
      <UserProfileAction 
        setIsEditClick={setIsEditClick}
        setIsFollowClick={setIsFollowClick}
      />
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