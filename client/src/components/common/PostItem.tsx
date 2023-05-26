import styled from 'styled-components';

import { AiFillStar } from 'react-icons/ai';
import CategoryTag from './CategoryTag';

import convertTag from '../../utils/convertTag';
import postOptionTags from '../../data/postOptionTags';
import { elapsedText } from '../../utils/elapsedText';

import { GamePagePostType } from '../../types/dataTypes';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeNav } from '../../slice/navSlice';
import PATH_URL from '../../constants/pathUrl';

const PostItem = ({ data: bookmarked }: { data: GamePagePostType }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onClickHandler = () => {
    dispatch(closeNav());
    navigation(
      `${PATH_URL.GAME}${bookmarked.gameId}/posts/${bookmarked.postId}`
    );
  };
  return (
    <StyledContainer onClick={onClickHandler}>
      <div>
        <StyledTitleContainer>
          <StyledTitle>{bookmarked.title}</StyledTitle>
          <CategoryTag
            categoryName={convertTag.asKR(bookmarked.postTag)}
            categoryId={postOptionTags.findIndex(
              (option) => option.value === convertTag.asKR(bookmarked.postTag)
            )}
          />
        </StyledTitleContainer>
        <StyledPostInfoContainer>
          <StyledText>
            작성자:{' '}
            {bookmarked.userName?.length >= 20
              ? '*삭제된 계정*'
              : bookmarked.userName}
          </StyledText>
          <StyledText>
            작성일:{' '}
            {typeof bookmarked.createdAt === 'string' &&
              elapsedText(new Date(bookmarked.createdAt))}
          </StyledText>
          {/* <span>추천 수: {bookmarked.likeCount}</span> */}
        </StyledPostInfoContainer>
      </div>
      <StyledSubContent>
        <StyledPostSubContentContainer>
          <span>댓글 : {bookmarked.commentCount}</span>
          <AiFillStar color={'var(--cyan-dark-500)'} size={20} />
        </StyledPostSubContentContainer>
      </StyledSubContent>
    </StyledContainer>
  );
};

export default PostItem;

const StyledContainer = styled.div`
  display: flex;
  cursor: pointer;
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
  & span {
    height: fit-content;
  }
`;

const StyledTitle = styled.h3`
  font-weight: bold;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem 0;
  overflow: hidden;
  max-width: 10rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
`;
const StyledText = styled.span`
  width: 9rem;
  padding: 0.5rem 0;
  overflow: hidden;
  word-break: keep-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8rem;
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
