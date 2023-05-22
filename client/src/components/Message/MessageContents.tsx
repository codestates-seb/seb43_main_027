import styled from 'styled-components';

import MessageOutput from './MessageOutput';
import MessageSend from './MessageSend';
import { Single } from './SingleMessage';
import { PageInfoType } from '../../types/dataTypes';

interface MessageContents {
  receiverId: number;
  messageResponse: Single[];
  addPrevMessages: (newData: Single[]) => void;
  addNewMessages: (newData: Single) => void;
  pageInfo: PageInfoType | null;
}

const MessageContents = ({
  messageResponse,
  receiverId,
  addPrevMessages,
  addNewMessages,
  pageInfo
}: MessageContents) => {
  return (
    <StyledBodyWrapper>
      <MessageOutput
        messageResponse={messageResponse}
        addPrevMessages={addPrevMessages}
        pageInfo={pageInfo}
      />
      <MessageSend receiverId={receiverId} addNewMessages={addNewMessages} />
    </StyledBodyWrapper>
  );
};

export default MessageContents;

const StyledBodyWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
`;
