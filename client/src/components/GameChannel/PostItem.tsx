import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import convertTag from '../../utils/convertTag';
import { elapsedText } from '../../utils/elapsedText';
import CategoryTag from '../common/CategoryTag';
import { type GamePagePostType } from '../../types/dataTypes';
import { AiFillStar } from 'react-icons/ai';
import PATH_URL from '../../constants/pathUrl';
import { postOptionTags } from '../../data/postOptionTags';
import { Tooltip } from 'antd';

const PostItem = ({
  gameId,
  postId,
  userName,
  title,
  postTag,
  views,
  commentCount,
  likeCount,
  createdAt,
  isPostIdIncluded
}: GamePagePostType) => {

  const filteredTitle = title.length >= 20
  ? title.slice(0, 20) + '...'
  : title;

  const userNameState = userName.length >= 20
  ? '*삭제된 계정*'
  : userName;

  const renderTitle = title.length >= 20 ? (
    <Tooltip placement="bottom" title={title}>
      <StyledTitle>{filteredTitle}</StyledTitle>
    </Tooltip>
  ) : (
    <StyledTitle>{title}</StyledTitle>
  );

  const tagName = convertTag.asKR(postTag);
  const tagId = postOptionTags.findIndex((option) => option.value === tagName);
  const formattedDate =
    typeof createdAt === 'string' ? elapsedText(new Date(createdAt)) : '';

  return (
    <Link to={`${PATH_URL.GAME}${gameId}/posts/${postId}`}>
      <StyledWrapper>
        <StyledContent>
          <StyledFlexRow>
            {renderTitle}
            <CategoryTag categoryId={tagId} categoryName={tagName} />
          </StyledFlexRow>
          <StyledFlexRow>
            <StyledInfo>
              <StyledSpan>작성자:</StyledSpan>
              <StyledUserName>{userNameState}</StyledUserName>
              <StyledSpan>작성일:</StyledSpan>
              {formattedDate}
              <StyledSpan>추천 수:</StyledSpan>
              {likeCount}
              <StyledSpan>조회 수:</StyledSpan>
              {views}
            </StyledInfo>
          </StyledFlexRow>
        </StyledContent>
        <StyledFlexRow>
          <StyledInfo>
            <StyledSpan>댓글:</StyledSpan>
            {commentCount}
            <AiFillStar
              fill={isPostIdIncluded ? '#13A8A8' : '#b4b4b4'}
              style={{ fontSize: '20px', top: '-3px', position: 'relative' }}
            />
          </StyledInfo>
        </StyledFlexRow>
      </StyledWrapper>
    </Link>
  );
};

export default PostItem;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px 10px;
  gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 389px;
`;

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
  cursor: pointer;
  &:hover {
    color: var(--cyan-light-800);
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 12px;
  color: var(--default-text-color);
`;

const StyledSpan = styled.span`
  font-weight: 600;
  color: var(--sub-text-color);
`;

const StyledUserName = styled.span`
  word-break: keep-all;
  overflow-wrap: break-word;
  max-width: 115px;
  @media screen and (max-width: 650px) {
    max-width: 80px;
  }
`;