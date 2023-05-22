import styled from 'styled-components';

import { useState, useEffect } from 'react';
import axios from 'axios';

import MessageHeader from '../components/Message/MessageHeader';
import MessageContents from '../components/Message/MessageContents';
import { Single } from '../components/Message/SingleMessage';

// 대화 상대방 아이디 send 하는 쪽에 전달해주면 됨.
const receiverId = 2;

const Message = () => {
  const [messageResponse, setMessageResponse] = useState<Single[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/messages/${receiverId}`
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
      <MessageHeader />
      <MessageContents
        messageResponse={messageResponse}
        receiverId={receiverId}
      />
    </StyledMessageContainer>
  );
};

export default Message;

const StyledMessageContainer = styled.div`
  display: flex;
  margin-left: 50rem;
  margin-top: -35rem;
  flex-direction: column;
  position: absolute;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  min-width: 40rem;
  min-height: 80rem;
  padding: 2rem;
  max-height: 40rem;

  z-index: 2;
`;
