import styled from 'styled-components';

import SingleMessage, { Single } from './SingleMessage';

interface OutputType {
  messageResponse: Single[];
}

const MessageOutput = ({ messageResponse }: OutputType) => {
  return (
    <>
      <StyledUL>
        {messageResponse.map((item, i) => (
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

  flex-direction: column;
  justify-content: flex-start;
  height: 50rem;
`;
