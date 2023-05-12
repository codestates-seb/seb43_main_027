import React from 'react';
import styled from 'styled-components';

const PostItem = ()  => {
  return (
    <StyledWrapper>
      <StyledContent>
        <StyledFlexRow>
          제목
          태그
        </StyledFlexRow>
        <StyledFlexRow>
          작성자
          작성일
          추천수
          조회수
        </StyledFlexRow>
      </StyledContent>
      <StyledFlexRow>
        댓글: 10
        북마크
      </StyledFlexRow>
    </StyledWrapper>
  );
};

export default PostItem;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 10px;
  border-bottom: 1px solid green;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  }
  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;