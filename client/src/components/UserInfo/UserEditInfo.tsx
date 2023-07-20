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
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../slice/userSlice';
import Modal from '../common/Modal';
import ComponentWithModal from '../common/ComponentWithModal';

const UserEditInfo = ({ setIsEditClick }: UserInfoProps) => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUserImg, setIsUserImg] = useState<string>('');
  const [isUserName, setIsUserName] = useState<string>('');

  const [isUserEmail, setIsUserEmail] = useState<string>('');
  const [isEditAboutMe, setIsEditAboutMe] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');
  const [vaildPassword, setVaildPassword] = useState<string>('');
  const [error, setError] = useState('');
  const [remindError, setRemindError] = useState('');
  const [nickNameError, setNickNameError] = useState('');
  const [isOpenNewInput, setIsOpenNewInput] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { TextArea } = Input;

  const passwordValidate =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,16}$/;

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
    const newNickname = event.target.value;

    setIsUserName(newNickname);

    const nicknameRegex = /^[a-zA-Z가-힣0-9]{2,10}$/;
    const isValidNickname = nicknameRegex.test(newNickname);

    if (!isValidNickname) {
      setNickNameError('특수문자를 제외한 2-10자여야 합니다.');
    } else {
      setNickNameError('');
    }
  };

  const handleAboutChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditAboutMe(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!passwordValidate.test(value)) {
      setError('영문자, 숫자, 특수문자 조합의 8-16자여야 합니다.');
      setEditPassword(value);
      return;
    }

    setEditPassword(value);
    setError('');

    if (value !== vaildPassword) {
      setRemindError('비밀번호가 일치하지 않습니다.');
    } else {
      setRemindError('');
    }
  };

  const handleValidChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (editPassword !== value) {
      setRemindError('비밀번호가 일치하지 않습니다.');
    } else {
      setRemindError('');
    }

    setVaildPassword(value);
  };

  // 프로필 수정 로직
  const handleSubmitEditClick = () => {
    if (!error && isUserName.length !== 0) {
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
          if (error.response && error.response.status === 409) {
            setNickNameError('이미 사용중인 닉네임입니다.');
          } else {
            console.error('프로필 저장 요청 실패:', error);
          }
        });
    } else {
      return;
    }
  };

  // 프로필 수정 취소 로직
  const handleCancleClick = () => {
    window.location.reload();
  };

  // 비밀번호 재설정 로직
  const handlePasswordClick = () => {
    setIsOpenNewInput(true);
  };

  const handleCanclePassword = () => {
    setIsOpenNewInput(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    dispatch(clearUser());
    navigate(`${PATH_URL.LOGIN}`);
  };

  const handleSubmitNewPassword = () => {
    if (!error && !remindError && editPassword.length !== 0) {
      const formData = new FormData();
      const jsonBlob = new Blob(
        [
          JSON.stringify({
            password: editPassword
          })
        ],
        { type: 'application/json' }
      );
      formData.append('patch', jsonBlob);

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
          if (!error && !remindError && editPassword.length !== 0) {
            setIsOpen(true);
          }
        })
        .catch((error) => {
          console.error('프로필 저장 요청 실패:', error);
        });
    } else {
      return;
    }
  };

  // 회원탈퇴 로직
  const handleRemoveClick = () => {
    const token = localStorage.getItem('access_token');
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/members/${memberId}`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then((response) => {
        setIsOpenModal(true);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate(`${PATH_URL.HOME}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error('언팔로우 요청 실패:', error);
      });
  };

  return (
    <StyledEditWrapper>
      <StyledText>이미지 수정:</StyledText>
      <UserProfileImg isUserImg={isUserImg} />
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
      <StyledEmailText>{isUserEmail}</StyledEmailText>
      닉네임 수정:
      {nickNameError.length > 0 && <StyledError>{nickNameError}</StyledError>}
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
      {isOpenNewInput ? (
        <StyledInputForm>
          <p>재설정 비밀번호:</p>
          {error.length > 0 && <StyledError>{error}</StyledError>}
          <Input.Password
            placeholder='input password'
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={handlePasswordChange}
          />
          <p>재확인 비밀번호:</p>
          {remindError.length > 0 && <StyledError>{remindError}</StyledError>}
          <Input.Password
            placeholder='input password'
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={handleValidChange}
          />
        </StyledInputForm>
      ) : null}
      <StyledNewPassword>
        {isOpenNewInput ? (
          <StyledSubmitBtn onClick={handleSubmitNewPassword}>
            비밀번호 변경
          </StyledSubmitBtn>
        ) : (
          <StyledSubmitBtn onClick={handlePasswordClick}>
            비밀번호 재설정
          </StyledSubmitBtn>
        )}
        {isOpenNewInput && (
          <StyledCancleBtn onClick={handleCanclePassword}>
            변경취소
          </StyledCancleBtn>
        )}
      </StyledNewPassword>
      <StyledCenter>
        <ComponentWithModal
          confirmMessage={`회원탈퇴를 선택하시면 모든 계정 정보가 영구적으로 삭제됩니다.
        \n계속 진행하시겠습니까?`}
          confirmOnClick={handleRemoveClick}
        >
          <StyledRemoveBtn>회원탈퇴</StyledRemoveBtn>
        </ComponentWithModal>
      </StyledCenter>
      <Modal
        isOpen={isOpenModal}
        confirmMessage={'회원탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.'}
        closeModalHandlerWithConfirm={() => {
          setIsOpenModal(false);
        }}
      />
      <Modal
        isOpen={isOpen}
        confirmMessage={`비밀번호가 변경되었습니다. 
        \n다시 로그인해주세요.`}
        closeModalHandlerWithConfirm={handleLogout}
        needError={false}
      />
    </StyledEditWrapper>
  );
};

export default UserEditInfo;

const StyledEditWrapper = styled(StyledTitleWrapper)`
  gap: 15px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 650px) {
    height: 100vh;
  }
`;

const StyledText = styled.p`
  position: relative;
  top: 0px;
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

const StyledNewPassword = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const StyledSubmitBtn = styled.div`
  cursor: pointer;
  color: var(--category-tag-bg-default);

  &:hover {
    color: var(--cyan-dark-600);
  }
`;

const StyledRemoveBtn = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: var(--default-text-color);
  cursor: pointer;
  border-style: none;
`;

const StyledEditImg = styled.div`
  font-size: 30px;
  position: relative;
  top: -50px;
  left: 50px;
  color: var(--button-inactive-color);
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: var(--cyan-dark-1000);
  }
`;

const StyledEmailText = styled.span`
  color: var(--cyan-light-700);
  position: relative;
  top: -20px;
`;

const StyledInputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--cyan-light-700);
`;

const StyledCancleBtn = styled.button`
  border-style: none;
  font-size: 12px;
  font-weight: 700;
  color: var(--category-tag-color-default);
  background-color: var(--sub-text-color);
  border-radius: 8px;
  padding: 5px 8px;
  &:hover {
    background-color: var(--button-hover-color);
  }
`;

const StyledError = styled.p`
  color: var(--category-tag-color-2);
`;

const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
`;
