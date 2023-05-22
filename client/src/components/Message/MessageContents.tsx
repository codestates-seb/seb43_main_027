import styled from 'styled-components';

import MessageOutput from './MessageOutput';
import MessageSend from './MessageSend';
import { Single } from './SingleMessage';

interface MessageContents {
  receiverId: number;
  messageChunk: Single[];
}

const MessageContents = ({ messageChunk, receiverId }: MessageContents) => {
  return (
    <StyledBodyWrapper>
      <MessageOutput messageChunk={messageChunk} />
      <MessageSend receiverId={receiverId} />
    </StyledBodyWrapper>
  );
};

export default MessageContents;

const StyledBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
