import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import styled from 'styled-components';
import { ReactionType } from '../../types/dataTypes';

const Reaction = ({
  reaction,
  likeCount
}: {
  reaction: ReactionType | null;
  likeCount: number;
}) => {
  return (
    <StyledContainer>
      <StyledIconBox>
        <AiOutlineLike cursor={'pointer'} />
        <span>{likeCount}</span>
      </StyledIconBox>
      <StyledIconBox>
        <AiOutlineDislike cursor={'pointer'} />
        <span>{likeCount}</span>
      </StyledIconBox>
    </StyledContainer>
  );
};

export default Reaction;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
  font-size: 2rem;
  border-bottom: 1px solid #ddd;
  gap: 1rem;
`;

const StyledIconBox = styled.div`
  display: flex;
  color: #999;
  align-items: center;
  gap: 0.5rem;
  > span {
    font-size: 1.2rem;
  }
`;
