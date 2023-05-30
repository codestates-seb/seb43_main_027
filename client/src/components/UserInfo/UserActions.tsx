import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import CreateChannelButton from '../ui/CreateChannelButton';
import { TbMessages } from 'react-icons/tb';
import PATH_URL from '../../constants/pathUrl';
import { UserActionProps } from '../../types/propsTypes';
import { useDispatch } from 'react-redux';
import { startChat } from '../../slice/chatSlice';


const UserProfileAction = ({ setIsEditClick, setIsFollowClick, imageUrl, userName }: UserActionProps ) => {
  const [isSameUser, setIsSameUser] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loginedId, setIsLoginedId] = useState<string>();

  const { memberId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFollowerData = async () => {
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

      setIsLoginedId(loginId);

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members/${loginId}/following`
        );
        const followedData = res.data.data;

        setIsFollowed(
          followedData.some(
            (user: any) => user.memberId.toString() === memberId
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowerData();
  }, [memberId]);

  const handleEditProfile = () => {
    setIsEditClick(true);
  };

  const handleFollow = () => {
    if (Number(loginedId) === -1) {
      navigate(`${PATH_URL.LOGIN}`);
    } else {
      const token = localStorage.getItem('access_token');
      if (isFollowed) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/api/members/${memberId}/unfollow`,
            {
              headers: {
                Authorization: `${token}`
              }
            }
          )
          .then((response) => {
            setIsFollowed(false);
            setIsFollowClick(isFollowed);
          })
          .catch((error) => {
            console.error('언팔로우 요청 실패:', error);
          });
      }
      if (!isFollowed) {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/members/${memberId}/follow`,
            {},
            {
              headers: {
                Authorization: `${token}`
              }
            }
          )
          .then((response) => {
            setIsFollowed(true);
            setIsFollowClick(isFollowed);
          })
          .catch((error) => {
            console.error('팔로우 요청 실패:', error);
          });
      };
    }
  };

  const handleMessage = () => {
    const receiver = {
      memberId,
      imageUrl,
      userName
    };

    dispatch(startChat(receiver));
  };

  return (
    <StyledWrapper>
      {isSameUser ? (
        <CreateChannelButton
          onClick={handleEditProfile}
          text={'프로필 수정하기'}
        />
      ) : (
        <>
          <CreateChannelButton
            onClick={handleFollow}
            text={isFollowed ? '팔로우 취소' : '팔로우 하기'}
          />
          <StyledMessageContain>
            <TbMessages onClick={handleMessage} />
          </StyledMessageContain>
        </>
      )}
    </StyledWrapper>
  );
};

export default UserProfileAction;

const StyledWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 30px;
  align-items: center;
`;

const StyledMessageContain = styled.div`
  color: var(--cyan-dark-800);
  font-size: 35px;
  cursor: pointer;
  &:hover {
    color: var(--button-inactive-color);
  }
`;
