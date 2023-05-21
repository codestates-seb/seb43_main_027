import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfileImg from './UserProfileImg';
import UserProfileName from './UserProfileName';
import UserAboutMe from './UserAboutMe';
import { StyledTitleWrapper, StyledAboutMe } from './UserTitle';
import CreateChannelButton from '../ui/CreateChannelButton';
import { CiCircleRemove } from 'react-icons/ci';
import { UserInfoProps } from '../../types/propsTypes';
import PATH_URL from '../../constants/pathUrl';

const UserEditInfo = ({ setIsEditClick }: UserInfoProps) => {
  
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [ isUserImg, setIsUserImg ] = useState<string>('');
  const [ isUserName, setIsUserName ] = useState<string>('');
  const [ isUserEmail, setIsUserEmail ] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      const getMemberData = localStorage.getItem('user');
      const memberData = getMemberData ? JSON.parse(getMemberData) : { memberId: -1 };
      const loginId = memberData.memberId;
  
      if (memberId !== loginId.toString()) {
        setIsEditClick(false);
        return;
      };

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

  const handleRemoveClick = () => {
    const result = window.confirm('회원탈퇴를 선택하시면 모든 계정 정보가 영구적으로 삭제됩니다.\n계속 진행하시겠습니까?');
  
    if (result) {
      const token = localStorage.getItem('access_token');
      axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/members/${memberId}`,
        {
          headers: {
            Authorization: `${token}`
          }
        }
      )
      .then((response) => {
        alert('회원탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate(`${PATH_URL.HOME}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error('언팔로우 요청 실패:', error);
      });
    } else {
      return;
    };
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
      <StyledRemoveBtn onClick={handleRemoveClick} >
        회원탈퇴
      </StyledRemoveBtn>
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

const StyledRemoveBtn = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: var(--default-text-color);
  cursor: pointer;
  border-style: none;
`;