import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { postData } from '../../api/apiCollection';
import { CommentType } from '../../types/dataTypes';
import Modal from '../common/Modal';

const CommentInput = ({
  onCommentSubmit
}: {
  onCommentSubmit: (value: CommentType) => void;
}) => {
  const commentRef = useRef<HTMLInputElement>(null);
  const { postId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((s: RootState) => s.user);

  const onClickHandler = () => {
    if (commentRef?.current?.value.length === 0) {
      setIsOpen(true);
      return;
    }
    postData(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comments`,
      JSON.stringify({
        content: commentRef?.current?.value
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token')
        }
      },
      (res) => {
        if (commentRef && commentRef.current) {
          onCommentSubmit(res.data.data);
          commentRef.current.value = '';
        }
      },
      (err) => {
        console.error(err);
      }
    );
  };
  return (
    <StyledContainer>
      <StyledInputBox>
        <StyledWrapper>
          <StyledImg src={user.imageUrl} />
          <StyledInput
            type='text'
            placeholder='댓글을 입력해주세요.'
            ref={commentRef}
            maxLength={1000}
          />
        </StyledWrapper>
        <StyledButton onClick={onClickHandler}>등록하기</StyledButton>
      </StyledInputBox>
      <Modal
        isOpen={isOpen}
        confirmMessage='내용을 입력해주세요.'
        closeModalHandlerWithConfirm={() => setIsOpen(false)}
      />
    </StyledContainer>
  );
};

export default CommentInput;

const StyledContainer = styled.div`
  border-bottom: 1px solid #999;
  padding-bottom: 2rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
`;

const StyledInputBox = styled.div`
  margin-top: 2rem;
  background-color: var(--cyan-light-100);
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
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
