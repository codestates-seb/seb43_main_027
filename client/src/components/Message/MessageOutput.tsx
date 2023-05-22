import styled from 'styled-components';

import SingleMessage, { Single } from './SingleMessage';

interface OutputType {
  messageChunk: Single[];
}

const MessageOutput = ({ messageChunk }: OutputType) => {
  return (
    <>
      <StyledUL>
        {messageChunk.map((item, i) => (
          <SingleMessage
            key={i}
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
  justify-content: flex-start;
`;
