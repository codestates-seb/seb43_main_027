import styled from 'styled-components';

import SingleMessage, { Single } from './SingleMessage';
import { useEffect, useRef } from 'react';

interface OutputType {
  messageResponse: Single[];
  addPrevMessages: (newData: Single[]) => void;
}

const MessageOutput = ({ messageResponse, addPrevMessages }: OutputType) => {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [ulRef.current]);

  return (
    <>
      <button
        onClick={() => {
          addPrevMessages([
            { content: 'test', createdAt: Date().toString(), senderId: 1 }
          ]);
        }}
      >
        test
      </button>
      <StyledUL ref={ulRef}>
        {messageResponse.map((item, i) => (
          <SingleMessage
            key={i}
            senderId={item.senderId}
            content={item.content}
            createdAt={item.createdAt}
          />
        ))}
      </StyledUL>
    </>
  );
};

export default MessageOutput;

const StyledUL = styled.ul`
  display: flex;
  flex: 1 0 0;
  gap: 4rem;
  flex-direction: column;
  justify-content: flex-end;
  height: 50rem;
  overflow-y: scroll;
  padding: 0.5rem;
  margin-bottom: 2rem;
`;
