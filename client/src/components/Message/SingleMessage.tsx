import styled from 'styled-components';

export interface Single {
  content: string;
  createdAt: string;
}

const SingleMessage = ({ content, createdAt }: Single) => {
  return (
    <StyledLI>
      <StyledProfile src='http://something.com' />
      <StyledContent>{content}</StyledContent>
      <StyledDate>{createdAt}</StyledDate>
    </StyledLI>
  );
};

export default SingleMessage;

const StyledLI = styled.li`
  margin: 0.5rem;
  font-size: 1.6rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  height: 2rem;
`;

const StyledProfile = styled.img``;

const StyledContent = styled.span``;

const StyledDate = styled.span`
  font-size: 1.2rem;
`;
