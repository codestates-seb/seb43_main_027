import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { postData } from '../../api/apiCollection';
import { CommentType } from '../../types/dataTypes';
import Modal from '../common/Modal';

const ReCommentInput = ({
  parentCommentId,
  onCommentSubmit
}: {
  parentCommentId: number;
  onCommentSubmit: (s: CommentType, id: number) => void;
}) => {
  const commentRef = useRef<HTMLInputElement>(null);
  const { postId } = useParams();
  const user = useSelector((s: RootState) => s.user);
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    if (commentRef?.current?.value.length === 0) {
      setIsOpen(true);
      return;
    }
    postData(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comments`,
      JSON.stringify({
        content: commentRef?.current?.value,
        parentCommentId
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token')
        }
      },
      (res) => {
        if (commentRef && commentRef.current) {
          onCommentSubmit(res.data.data, parentCommentId);
          commentRef.current.value = '';
        }
      },
      () => {
        console.log('test');
      }
    );
  };
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledImg src={user.imageUrl} />
        <StyledInputBox>
          <StyledInput
            type='text'
            placeholder='댓글을 입력해주세요.'
            ref={commentRef}
          />
          <StyledButton onClick={onClickHandler}>등록하기</StyledButton>
        </StyledInputBox>
      </StyledWrapper>
      <Modal
        isOpen={isOpen}
        confirmMessage='내용을 입력해주세요.'
        closeModalHandlerWithConfirm={() => setIsOpen(false)}
      />
    </StyledContainer>
  );
};

export default ReCommentInput;

const StyledContainer = styled.div`
  margin-top: 2rem;
  background-color: var(--cyan-light-100);
  padding: 2rem;
  border-radius: 1rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
`;

const StyledInputBox = styled.div`
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
