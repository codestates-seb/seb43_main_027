import styled from 'styled-components';
import { elapsedText } from '../../utils/elapsedText';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export interface Single {
  senderId: number;
  content: string;
  createdAt: string;
}

const SingleMessage = ({ content, createdAt, senderId }: Single) => {
  const user = useSelector((s: RootState) => s.user);

  return (
    <StyledLI isSender={user.memberId === senderId}>
      {/* <StyledProfile src='http://something.com' /> */}
      <StyledContent>{content}</StyledContent>
      <StyledDate>{elapsedText(new Date(createdAt))}</StyledDate>
    </StyledLI>
  );
};

export default SingleMessage;

const StyledLI = styled.li<{ isSender: boolean }>`
  display: flex;
  flex-direction: ${({ isSender }) => (isSender ? 'row-reverse' : 'row')};
  align-items: flex-end;
  gap: 1rem;
`;

// const StyledProfile = styled.img``;

const StyledContent = styled.span`
  display: block;
  padding: 1rem;
  font-size: 1.4rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  max-width: 80%;
`;

const StyledDate = styled.span`
  font-size: 1rem;
  color: #999;
`;
