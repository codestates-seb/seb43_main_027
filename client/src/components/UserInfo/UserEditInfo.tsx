import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfileImg from './UserProfileImg';
import { StyledTitleWrapper } from './UserTitle';
import CreateChannelButton from '../ui/CreateChannelButton';
import { CiCircleRemove } from 'react-icons/ci';
import { FiEdit } from 'react-icons/fi';
import { UserInfoProps } from '../../types/propsTypes';
import PATH_URL from '../../constants/pathUrl';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slice/userSlice';

const UserEditInfo = ({ setIsEditClick }: UserInfoProps) => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUserImg, setIsUserImg] = useState<string>('');
  const [isUserName, setIsUserName] = useState<string>('');
  const [isUserEmail, setIsUserEmail] = useState<string>('');
  const [isEditAboutMe, setIsEditAboutMe] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { TextArea } = Input;

  useEffect(() => {
    const fetchUserData = async () => {
      const getMemberData = localStorage.getItem('user');
      const memberData = getMemberData
        ? JSON.parse(getMemberData)
        : { memberId: -1 };
      const loginId = memberData.memberId;

      if (memberId !== loginId.toString()) {
        setIsEditClick(false);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members/${memberId}/profile`
        );
        const fetchedData = res.data.data;

        console.log(fetchedData);

        setIsUserImg(fetchedData.imageUrl);
        setIsUserName(fetchedData.userName);
        setIsUserEmail(fetchedData.email);
        setIsEditAboutMe(fetchedData.aboutMe);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [memberId]);

  if (isUserName === null) {
    setIsUserName('등록된 닉네임이 없습니다.');
  }

  // 입력폼 핸들러
  const handleUploadImg = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setIsUserImg(fileURL);
    }
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsUserName(event.target.value);
  };

  const handleAboutChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditAboutMe(event.target.value);
  };

  // 프로필 수정 로직
  const handleSubmitEditClick = () => {
    const formData = new FormData();

    const jsonBlob = new Blob(
      [
        JSON.stringify({
          username: isUserName,
          aboutMe: isEditAboutMe
        })
      ],
      { type: 'application/json' }
    );

    formData.append('patch', jsonBlob);

    if (selectedFile) {
      formData.append('file', selectedFile, selectedFile.name);
    }

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/members/${memberId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('access_token')
          }
        }
      )
      .then((response) => {
        setIsEditClick(false);
        dispatch(setUser(response.data.data));
      })
      .catch((error) => {
        console.error('프로필 저장 요청 실패:', error);
      });
  };

  // 프로필 수정 취소 로직
  const handleCancleClick = () => {
    window.location.reload();
  };

  // 회원탈퇴 로직
  const handleRemoveClick = () => {
    const result = window.confirm(
      '회원탈퇴를 선택하시면 모든 계정 정보가 영구적으로 삭제됩니다.\n계속 진행하시겠습니까?'
    );

    if (result) {
      const token = localStorage.getItem('access_token');
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/members/${memberId}`, {
          headers: {
            Authorization: `${token}`
          }
        })
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
    }
  };

  return (
    <StyledEditWrapper>
      <StyledText>이미지 수정:</StyledText>
      <StyledEditImg>
        <input
          type='file'
          onChange={handleUploadImg}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <FiEdit
          onClick={() => {
            (
              document.querySelector('input[type="file"]') as HTMLInputElement
            )?.click();
          }}
        />
      </StyledEditImg>
      <UserProfileImg isUserImg={isUserImg} />
      <StyledEmailText>{isUserEmail}</StyledEmailText>
      닉네임 수정:
      <Input
        placeholder='닉네임 수정'
        prefix={<UserOutlined />}
        style={{ width: '200px' }}
        value={isUserName}
        onChange={handleNicknameChange}
      />
      소개글 수정:
      <StyledEditAboutMe>
        <TextArea
          placeholder='소개글을 작성해주세요.'
          maxLength={100}
          style={{ height: '100px', width: '300px' }}
          value={isEditAboutMe}
          onChange={handleAboutChange}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </StyledEditAboutMe>
      <StyledActionContain>
        <CreateChannelButton
          text={'프로필 저장하기'}
          onClick={handleSubmitEditClick}
        />
        <StyledCancleContain>
          <CiCircleRemove onClick={handleCancleClick} />
        </StyledCancleContain>
      </StyledActionContain>
      <StyledRemoveBtn onClick={handleRemoveClick}>회원탈퇴</StyledRemoveBtn>
    </StyledEditWrapper>
  );
};

export default UserEditInfo;

const StyledEditWrapper = styled(StyledTitleWrapper)`
  gap: 15px;
  font-size: 14px;
  @media screen and (max-width: 650px) {
    height: 100vh;
  };
`;

const StyledText = styled.p`
  position: relative;
  top: 50px;
`;

const StyledEditAboutMe = styled.div`
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

const StyledEditImg = styled.div`
  font-size: 30px;
  position: relative;
  top: 160px;
  left: 55px;
  color: var(--button-inactive-color);
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: var(--cyan-dark-1000);
  }
`;

const StyledEmailText = styled.p`
  color: var(--cyan-light-700);
`;
