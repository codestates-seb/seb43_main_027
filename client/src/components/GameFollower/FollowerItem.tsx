import styled from 'styled-components';
import { User } from '../../types/dataTypes';
import UserProfileImg from '../UserInfo/UserProfileImg';
import { StyledFollowed } from '../UserInfo/UserProfileName';
import { TbMessages } from 'react-icons/tb';
import { StyledItemWrapper } from '../CategoryGames/GameItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import PATH_URL from '../../constants/pathUrl';
import { deleteData, postData } from '../../api/apiCollection';
import { useState } from 'react';
import { startChat } from '../../slice/chatSlice';
import ComponentWithModal from '../common/ComponentWithModal';
import { AiOutlineClose } from 'react-icons/ai';
import DeleteGamer from '../../asset/Deletegamer.png';
import Modal from '../common/Modal';

const FollowerItem = (
  props: User & {
    followerCount: number;
    followingCount: number;
    isFollowed: boolean;
  }
) => {
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.user);
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onFollowBtnClickHandler = () => {
    if (isFollowed) {
      deleteData(
        `${process.env.REACT_APP_API_URL}/api/members/${props.memberId}/unfollow`,
        {
          headers: {
            Authorization: localStorage.getItem('access_token')
          }
        },
        () => {
          setIsFollowed(false);
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      postData(
        `${process.env.REACT_APP_API_URL}/api/members/${props.memberId}/follow`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('access_token')
          }
        },
        () => {
          setIsFollowed(true);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  };

  const onUserClickHandler = (memberId: number) => () => {
    if (props.userName.length >= 20) {
      setIsOpen(true);
    } else {
      navigate(`${PATH_URL.USER_INFO}${memberId}`);
    }
  };

  const onMessageClickHandler = () => {
    dispatch(
      startChat({
        memberId: props.memberId,
        imageUrl: props.imageUrl,
        userName: props.userName
      })
    );
  };

  return (
    <StyledWrapper>
      <StyledContain onClick={onUserClickHandler(props.memberId)}>
        {props.userName.length >= 20 && (
          <StyledDeletedIcon>
            <AiOutlineClose />
          </StyledDeletedIcon>
        )}
        <UserProfileImg
          isUserImg={props.userName.length >= 20 ? DeleteGamer : props.imageUrl}
        />
        <StyledUserName>
          {props.userName.length >= 20 ? '*삭제된 계정*' : props.userName}
        </StyledUserName>
        <StyledFollowed>
          <p>팔로워: {props.followerCount}</p>
          <p>팔로잉: {props.followingCount}</p>
        </StyledFollowed>
      </StyledContain>
      {props.userName.length < 21 ? (
        user.memberId !== props.memberId ? (
          <StyledRow>
            {isFollowed ? (
              <ComponentWithModal
                confirmOnClick={onFollowBtnClickHandler}
                confirmMessage='팔로우를 취소하시겠습니까?'
              >
                <StyledFollowButton>팔로우취소</StyledFollowButton>
              </ComponentWithModal>
            ) : (
              <StyledFollowButton onClick={onFollowBtnClickHandler}>
                팔로우
              </StyledFollowButton>
            )}

            <StyledMessageContain>
              <TbMessages onClick={onMessageClickHandler} />
            </StyledMessageContain>
          </StyledRow>
        ) : (
          <StyledRow>
            <StyledFollowButton onClick={onUserClickHandler(user.memberId)}>
              {'내 프로필보기'}
            </StyledFollowButton>
          </StyledRow>
        )
      ) : user.memberId !== props.memberId ? (
        <StyledRow>
          {isFollowed ? (
            <ComponentWithModal
              confirmOnClick={onFollowBtnClickHandler}
              confirmMessage='팔로우를 취소하시겠습니까?'
            >
              <StyledFollowButton>팔로우취소</StyledFollowButton>
            </ComponentWithModal>
          ) : (
            <StyledFollowButton disabled>팔로우</StyledFollowButton>
          )}

          <StyledMessageContain>
            <TbMessages onClick={onMessageClickHandler} />
          </StyledMessageContain>
        </StyledRow>
      ) : (
        <StyledRow>
          <StyledFollowButton onClick={onUserClickHandler(user.memberId)}>
            {'내 프로필보기'}
          </StyledFollowButton>
        </StyledRow>
      )}
      <Modal
        isOpen={isOpen}
        closeModalHandlerWithConfirm={() => setIsOpen(false)}
        confirmMessage='삭제된 계정입니다.'
      />
    </StyledWrapper>
  );
};

export default FollowerItem;

const StyledWrapper = styled(StyledItemWrapper)`
  display: flex;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  cursor: default;
  &:hover {
    color: #000;
  }
`;

const StyledContain = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
`;

const StyledUserName = styled.p`
  padding-top: 10px;
  font-size: 14px;
  padding: 0px 20px;
  margin-top: 15px;
  width: 100%;
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: center;
`;

const StyledFollowButton = styled.button<{ disabled?: boolean }>`
  font-size: 15px;
  padding: 10px 25px;
  outline: none;
  border: none;
  background-color: ${({ disabled }) =>
    disabled ? 'var(--default-text-color)' : 'var(--cyan-light-700)'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 15px;
  color: var(--cyan-light-100);
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 0 0;
  justify-content: center;
  &:hover {
    background-color: ${({ disabled }) =>
      !disabled && 'var(--button-inactive-hover-color)'};
  }
`;

const StyledMessageContain = styled.div`
  color: var(--cyan-dark-800);
  font-size: 35px;
  cursor: pointer;
  &:hover {
    color: var(--button-inactive-color);
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  gap: 1rem;
  width: 100%;
  padding: 1rem;
`;

const StyledDeletedIcon = styled.div`
  position: absolute;
  top: 110px;
  font-size: 100px;
  color: var(--category-tag-color-2);
`;
