import styled from 'styled-components';

import MessageOutput from './MessageOutput';
import MessageSend from './MessageSend';
import { Single } from './SingleMessage';
import { PageInfoType } from '../../types/dataTypes';

interface MessageContents {
  receiverId: number;
  messageResponse: Single[];
  receiverName: string;
  addPrevMessages: (newData: Single[]) => void;
  addNewMessages: (newData: Single) => void;
  pageInfo: PageInfoType | null;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageContents = ({
  messageResponse,
  receiverId,
  receiverName,
  addPrevMessages,
  addNewMessages,
  pageInfo,
  setIsSubmitted
}: MessageContents) => {
  return (
    <StyledBodyWrapper>
      <MessageOutput
        messageResponse={messageResponse}
        addPrevMessages={addPrevMessages}
        pageInfo={pageInfo}
      />
      <MessageSend
        receiverId={receiverId}
        addNewMessages={addNewMessages}
        receiverName={receiverName}
        setIsSubmitted={setIsSubmitted}
      />
    </StyledBodyWrapper>
  );
};

export default MessageContents;

const StyledBodyWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
`;
