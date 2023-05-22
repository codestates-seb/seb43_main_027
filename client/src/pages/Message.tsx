import styled from 'styled-components';

import { useState, useEffect } from 'react';
import axios from 'axios';

import MessageHeader from '../components/Message/MessageHeader';
import MessageContents from '../components/Message/MessageContents';
import { Single } from '../components/Message/SingleMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { stopChat } from '../slice/chatSlice';

// 대화 상대방 아이디 send 하는 쪽에 전달해주면 됨.

const Message = () => {
  const user = useSelector((s: RootState) => s.user);
  const [messageResponse, setMessageResponse] = useState<Single[]>([]);
  const chatInfo = useSelector((s: RootState) => s.chat);
  const dispatch = useDispatch();
  console.log(chatInfo);

  const addPrevMessages = (newData: Single[]) => {
    setMessageResponse((prev) => [...newData, ...prev]);
  };

  const addNewMessages = (newData: Single) => {
    setMessageResponse((prev) => [...prev, newData]);
  };

  useEffect(() => {
    if (user.memberId === -1) {
      dispatch(stopChat());
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/messages/${chatInfo.receiver.memberId}`,
          {
            headers: {
              Authorization: localStorage.getItem('access_token')
            }
          }
        );
        setMessageResponse(res.data.data);
      } catch (error) {
        console.error('에러가 발생했습니다: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledMessageContainer>
      <MessageHeader
        imageUrl={chatInfo.receiver.imageUrl}
        userName={chatInfo.receiver.userName}
        userId={chatInfo.receiver.memberId}
      />
      <MessageContents
        messageResponse={messageResponse}
        receiverId={chatInfo.receiver.memberId}
        addPrevMessages={addPrevMessages}
        addNewMessages={addNewMessages}
      />
    </StyledMessageContainer>
  );
};

export default Message;

const StyledMessageContainer = styled.div`
  display: flex;
  top: 50px;
  flex-direction: column;
  position: fixed;
  background-color: rgb(255, 255, 255);
  width: 100%;
  min-width: 40rem;
  height: calc(100vh - 50px);
  padding: 2rem;
  z-index: 2;
`;
