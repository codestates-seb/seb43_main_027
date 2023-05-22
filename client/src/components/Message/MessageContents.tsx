import styled from 'styled-components';

import MessageOutput from './MessageOutput';
import MessageSend from './MessageSend';
import { Single } from './SingleMessage';

interface MessageContents {
  receiverId: number;
  messageResponse: Single[];
  addPrevMessages: (newData: Single[]) => void;
}

const MessageContents = ({
  messageResponse,
  receiverId,
  addPrevMessages
}: MessageContents) => {
  return (
    <StyledBodyWrapper>
      <MessageOutput
        messageResponse={messageResponse}
        addPrevMessages={addPrevMessages}
      />
      <MessageSend receiverId={receiverId} />
    </StyledBodyWrapper>
  );
};

export default MessageContents;

const StyledBodyWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
`;
