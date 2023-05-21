import styled from 'styled-components';
import { CommentType } from '../../types/dataTypes';
import { elapsedText } from '../../utils/elapsedText';
import ReCommentInput from './ReCommentInput';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { patchData } from '../../api/apiCollection';
import { useParams } from 'react-router-dom';

const CommentItem = ({
  comment,
  onCommentSubmit
}: {
  comment: CommentType;
  onCommentSubmit: () => void;
}) => {
  const user = useSelector((s: RootState) => s.user);
  const { gameId, postId } = useParams();
  const [reComment, setReComment] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onReCommentClickHandler = () => {
    setReComment((prev) => !prev);
  };

  const onUpdateClickHandler = () => {
    setIsUpdate((prev) => !prev);
  };

  const onSubmitClickHandler = () => {
    if (inputRef && inputRef.current && inputRef.current.value.length > 0) {
      patchData(
        `${process.env.REACT_APP_API_URL}/api/games/${gameId}/posts/${postId}/comments/${comment.commentId}`,
        JSON.stringify({ content: inputRef?.current?.value }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('access_token')
          }
        },
        () => {
          if (inputRef && inputRef.current) inputRef.current.value = '';
          onCommentSubmit();
          setIsUpdate(false);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    return;
  };
  return (
    <StyledCommentContainer>
      <StyledContainer>
        <StyledImg src={comment.member.imageUrl} />
        <StyledWrapper>
          <StyledInfoBox>
            <span>{comment.member.userName}</span>
            <span>{elapsedText(new Date(comment.createdAt))}</span>
          </StyledInfoBox>
          {isUpdate ? (
            <>
              <StyledInput defaultValue={comment.content} ref={inputRef} />
              <StyledButton onClick={onSubmitClickHandler}>
                수정하기
              </StyledButton>
            </>
          ) : (
            <StyledCommentContent>{comment.content}</StyledCommentContent>
          )}

          <StyledContainer>
            {user.memberId === comment.member.memberId && (
              <StyledText onClick={onUpdateClickHandler}>
                {!isUpdate ? '수정하기' : '취소하기'}
              </StyledText>
            )}
            {user.memberId !== -1 && (
              <StyledText onClick={onReCommentClickHandler}>
                대댓글 달기
              </StyledText>
            )}
          </StyledContainer>
        </StyledWrapper>
      </StyledContainer>
      {reComment && <ReCommentInput />}
    </StyledCommentContainer>
  );
};

export default CommentItem;

const StyledCommentContainer = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid #999;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const StyledImg = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  gap: 1rem;
`;

const StyledInfoBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
  > span:last-child {
    color: #999;
  }
`;

const StyledCommentContent = styled.div`
  width: 100%;
  font-size: 1.2rem;
`;

const StyledText = styled.span`
  cursor: pointer;
  color: #999;
  font-size: 0.7rem;
`;
const StyledInput = styled.input`
  border: 1px solid var(--cyan-dark-500);
  width: 100%;
  font-size: 1.6rem;
  padding: 0.5rem;
  outline: none;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: var(--cyan-dark-500);
  color: white;
  padding: 0.7rem 1rem;
`;
