import styled from 'styled-components';
import PATH_URL from '../../constants/pathUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { elapsedText } from '../../utils/elapsedText';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { BsArrowReturnRight } from 'react-icons/bs';
import { CommentType } from '../../types/dataTypes';
import { deleteData, patchData } from '../../api/apiCollection';

const ReCommentItem = ({
  comment,
  onReCommentSubmit,
  onReCommentDelete
}: {
  comment: CommentType;
  onReCommentSubmit: (s: any, commentId: number, parentId: number) => void;
  onReCommentDelete: (commentId: number, parentId: number) => void;
}) => {
  const navigation = useNavigate();
  const user = useSelector((s: RootState) => s.user);
  const { postId } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdateClickHandler = () => {
    setIsUpdate((prev) => !prev);
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
            onReCommentSubmit(
              inputRef.current.value,
              comment.commentId,
              comment.parentCommentId
            );
            inputRef.current.value = '';
          }
          setIsUpdate(false);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const onNameClickHandler = () => {
    navigation(`${PATH_URL.USER_INFO}${comment.member.memberId}`);
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
        onReCommentDelete(comment.commentId, comment.parentCommentId);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  return (
    <StyledCommentContainer>
      <StyledContainer>
        <BsArrowReturnRight size={'2rem'} color={'#999'} />
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
            </StyledContainer>
          )}
        </StyledWrapper>
      </StyledContainer>
    </StyledCommentContainer>
  );
};

export default ReCommentItem;

const StyledCommentContainer = styled.div`
  padding: 2rem 0;
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
