import styled from 'styled-components';

import MessageOutput from './MessageOutput';
import MessageSend from './MessageSend';
import { Single } from './SingleMessage';

interface MessageContents {
  receiverId: number;
  messageResponse: Single[];
}

const MessageContents = ({ messageResponse, receiverId }: MessageContents) => {
  return (
    <StyledBodyWrapper>
      <MessageOutput messageResponse={messageResponse} />
      <MessageSend receiverId={receiverId} />
    </StyledBodyWrapper>
  );
};

export default MessageContents;

const StyledBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
