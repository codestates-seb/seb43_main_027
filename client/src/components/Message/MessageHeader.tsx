import styled from 'styled-components';

const MessageHeader = () => {
  return (
    <StyledWrapper>
      <StyledLeft>
        <StyledIMG href='http://something' />
        <StyledUsername>Username</StyledUsername>
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
  height: 5rem;
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
  border-style: none;
  height: 2rem;
`;
const StyledRight = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;
