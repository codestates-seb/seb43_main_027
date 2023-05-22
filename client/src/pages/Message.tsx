import styled from 'styled-components';

import { useState, useEffect } from 'react';
import axios from 'axios';

import MessageHeader from '../components/Message/MessageHeader';
import MessageContents from '../components/Message/MessageContents';
import { Single } from '../components/Message/SingleMessage';

const dummyMessage = [
  {
    senderId: 3,
    content: '첫번째 그대의의',
    createdAt: '2023-05-22T01:30:54'
  },
  {
    senderId: 3,
    content: '두 번째 그대의의ㅇㅇㅇ',
    createdAt: '2023-05-22T01:31:06'
  },
  {
    senderId: 3,
    content: '세 번째 그대의의ㅇㅇㅇ',
    createdAt: '2023-05-22T01:31:14'
  },
  {
    senderId: 3,
    content: '네번째 그대의',
    createdAt: '2023-05-22T01:31:23'
  }
];

const receiverId = 1;

const Message = () => {
  const [messageChunk, setMessageChunk] = useState<Single[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/messages/${receiverId}`)
      .then((res) => {
        setMessageChunk(res.data);
      });
  }, []);

  return (
    <StyledMessageContainer>
      <MessageHeader />
      <MessageContents messageChunk={messageChunk} receiverId={1} />
    </StyledMessageContainer>
  );
};

export default Message;

const StyledMessageContainer = styled.div`
  position: absolute;
  width: 50%;
`;
