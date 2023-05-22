import styled from 'styled-components';

export interface Single {
  content: string;
  createdAt: string;
}

const SingleMessage = ({ content, createdAt }: Single) => {
  return (
    <StyledLI>
      <StyledContent>{content}</StyledContent>
      <StyledDate>{createdAt}</StyledDate>
    </StyledLI>
  );
};

export default SingleMessage;

const StyledLI = styled.li`
  font-size: 1.4rem;
`;

const StyledContent = styled.span``;

const StyledDate = styled.span``;
