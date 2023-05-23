import styled from 'styled-components';
import { CommentType } from '../../types/dataTypes';
import { elapsedText } from '../../utils/elapsedText';
import ReCommentInput from './ReCommentInput';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { deleteData, patchData } from '../../api/apiCollection';
import { useNavigate, useParams } from 'react-router-dom';
import PATH_URL from '../../constants/pathUrl';
import ReCommentItem from './ReCommentItem';

// TODO: 대댓글 기능 요청 기능 구현 완료 대댓글 구현될 시 대댓글 보여지도록 구현해야함
const CommentItem = ({
  comment,
  onCommentSubmit,
  onCommentDelete,
  onReCommentSubmit,
  onReCommentUpdate,
  onReCommentDelete
}: {
  comment: CommentType;
  onCommentSubmit: (s: any, id: number) => void;
  onCommentDelete: (commentId: number) => void;
  onReCommentSubmit: (s: any, id: number) => void;
  onReCommentUpdate: (s: any, commentId: number, parentId: number) => void;
  onReCommentDelete: (commentId: number, parentId: number) => void;
}) => {
  const user = useSelector((s: RootState) => s.user);
  const { postId } = useParams();
  const [reComment, setReComment] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  const onReCommentClickHandler = () => {
    setReComment((prev) => !prev);
  };

  const onUpdateClickHandler = () => {
    setIsUpdate((prev) => !prev);
  };

  const onReCommentSubmitHandler = (s: any, id: number) => {
    onReCommentClickHandler();
    onReCommentSubmit(s, id);
  };
  const onNameClickHandler = () => {
    navigation(`${PATH_URL.USER_INFO}${comment.member.memberId}`);
  };

  const onSubmitClickHandler = () => {
    if (inputRef && inputRef.current && inputRef.current.value.length > 0) {
      patchData(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comments/${comment.commentId}`,
        JSON.stringify({ content: inputRef?.current?.value }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('access_token')
          }
        },
        () => {
          if (inputRef && inputRef.current) {
            onCommentSubmit(inputRef.current.value, comment.commentId);
            inputRef.current.value = '';
          }
          setIsUpdate(false);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    return;
  };

  const onDeleteClickHandler = () => {
    deleteData(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comments/${comment.commentId}`,
      {
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      },
      () => {
        onCommentDelete(comment.commentId);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  return (
    <StyledCommentContainer>
      <StyledContainer>
        <StyledImg src={comment.member.imageUrl} />
        <StyledWrapper>
          <StyledInfoBox>
            <span onClick={onNameClickHandler} style={{ cursor: 'pointer' }}>
              {comment.member.userName}
            </span>
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
            <StyledCommentContent>
              {comment.commentStatus === 'COMMENT_REGISTRATION'
                ? comment.content
                : '삭제된 댓글입니다'}
            </StyledCommentContent>
          )}
          {comment.commentStatus === 'COMMENT_REGISTRATION' && (
            <StyledContainer>
              {user.memberId === comment.member.memberId && (
                <>
                  <StyledText onClick={onUpdateClickHandler}>
                    {!isUpdate ? '수정하기' : '취소하기'}
                  </StyledText>
                  <StyledText onClick={onDeleteClickHandler}>
                    삭제하기
                  </StyledText>
                </>
              )}
              {user.memberId !== -1 && comment.parentCommentId !== -1 && (
                <StyledText onClick={onReCommentClickHandler}>
                  대댓글 달기
                </StyledText>
              )}
            </StyledContainer>
          )}
        </StyledWrapper>
      </StyledContainer>
      {comment.replies?.map((reply) => (
        <ReCommentItem
          key={reply.commentId}
          comment={reply}
          onReCommentSubmit={onReCommentUpdate}
          onReCommentDelete={onReCommentDelete}
        />
      ))}
      {reComment && (
        <ReCommentInput
          parentCommentId={comment.commentId}
          onCommentSubmit={onReCommentSubmitHandler}
        />
      )}
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
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
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
