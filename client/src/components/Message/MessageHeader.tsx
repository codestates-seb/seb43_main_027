import styled from 'styled-components';

const MessageHeader = () => {
  return (
    <StyledWrapper>
      <StyledLeft>
        <StyledIMG />
        <StyledUsername />
      </StyledLeft>
      <StyledBlank />
      <StyledRight>
        <StyledCloseButton>X</StyledCloseButton>
      </StyledRight>
    </StyledWrapper>
  );
};

export default MessageHeader;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLeft = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledIMG = styled.a``;

const StyledUsername = styled.div``;

const StyledBlank = styled.div`
  display: flex;
  flex: 1;
`;

const StyledCloseButton = styled.button`
  background-color: var(--cyan-dark-400);
  color: white;
`;
const StyledRight = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
