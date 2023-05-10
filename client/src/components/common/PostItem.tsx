import { useState } from 'react';
import styled from 'styled-components';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Badge from '../ui/Badge';

const PostItem = () => {
  const [marked, setMarked] = useState(false);

  const invertMarked = () => {
    setMarked((prev) => !prev);
  };
  return (
    <StyledContainer>
      <div>
        <StyledTitleContainer>
          <StyledTitle>title</StyledTitle>
          <Badge text='모집 중' />
        </StyledTitleContainer>
        <StyledPostInfoContainer>
          <span>작성자: username</span>
          <span>작성일: 1분 전</span>
          <span>추천 수: 0</span>
        </StyledPostInfoContainer>
      </div>
      <StyledSubContent>
        <StyledPostSubContentContainer>
          <span>댓글 : 0</span>
          {marked ? (
            <AiFillStar
              color={'var(--cyan-dark-500)'}
              size={20}
              onClick={invertMarked}
            />
          ) : (
            <AiOutlineStar
              color={'var(--cyan-dark-500)'}
              size={20}
              onClick={invertMarked}
            />
          )}
        </StyledPostSubContentContainer>
      </StyledSubContent>
    </StyledContainer>
  );
};

export default PostItem;

const StyledContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
  background-color: #fff;
  width: 100%;
  border-bottom: 1px solid var(--cyan-dark-500);
  justify-content: space-between;
  align-items: center;
`;

const StyledSubContent = styled.div`
  display: flex;
  gap: 2rem;
`;
const StyledTitleContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
const StyledTitle = styled.h3`
  font-weight: bold;
  font-size: 2rem;
`;
const StyledPostInfoContainer = styled.div`
  display: flex;
  color: rgba(0, 0, 0, 0.45);
  gap: 2rem;
  font-size: 1.2rem;
  margin-top: 1rem;
`;
const StyledPostSubContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
