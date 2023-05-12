import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryTag from '../../components/common/CategoryTag';
import { StarTwoTone } from '@ant-design/icons';

const PostItem = ()  => {

  const [ isMarked, setMarked ] = useState(false);

  const handleMark = () => {
    setMarked((prev) => !prev)
  }

  // 필터링 데이터패칭 해서 받아와야됨, 글자수 제한 ... 

  return (
    <StyledWrapper>
      <StyledContent>
        <StyledFlexRow>
          <StyledTitle>
            제목 엄청나게 긴 제목제목 엄청나게 긴 제목 ...
          </StyledTitle>
          <CategoryTag index={0} categoryName='모집'/>
        </StyledFlexRow>
        <StyledFlexRow>
          <StyledInfo>
            <p>작성자: </p>
            <p>작성일: </p>
            <p>추천수: </p>
            <p>조회수: </p>      
          </StyledInfo>
        </StyledFlexRow>
      </StyledContent>
      <StyledFlexRow>
      <StyledInfo>
        <p>댓글: 0</p>
        <StarTwoTone
          onClick={handleMark}
          twoToneColor={ isMarked ? '#13A8A8'  : '#b4b4b4' }
          style={{ fontSize: '20px' }}
        />
      </StyledInfo>
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

const StyledTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-right: 20px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const StyledInfo = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 14px;
  color: var(--default-text-color);
`