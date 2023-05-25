import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike
} from 'react-icons/ai';
import styled from 'styled-components';
import { ReactionType } from '../../types/dataTypes';
import { useParams } from 'react-router-dom';
import { deleteData, postData } from '../../api/apiCollection';
import { useState } from 'react';
import Modal from '../common/Modal';

const Reaction = ({
  reaction,
  likeCount,
  unlikeCount,
  onReactionChange
}: {
  reaction: ReactionType | null;
  likeCount: number;
  unlikeCount: number;
  onReactionChange: (s: any) => () => void;
}) => {
  const { postId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const onLikeClickHandler = (reactionStatus: string) => () => {
    postData(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/reaction`,
      JSON.stringify({
        reactionStatus: reactionStatus
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token')
        }
      },
      (res) => {
        onReactionChange({
          reaction: res.data.data,
          likeCount: reactionStatus === 'HAPPY' ? likeCount + 1 : likeCount,
          unlikeCount:
            reactionStatus === 'UNHAPPY' ? unlikeCount + 1 : unlikeCount
        })();
      },
      (err) => {
        if (err?.response?.status === 409) {
          setIsOpen(true);
        }
      }
    );
  };
  const onUnLikeClickHandler = (reactionStatus: string) => () => {
    deleteData(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/unreaction`,
      {
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      },
      () => {
        onReactionChange({
          reaction: null,
          likeCount: reactionStatus === 'HAPPY' ? likeCount - 1 : likeCount,
          unlikeCount:
            reactionStatus === 'UNHAPPY' ? unlikeCount - 1 : unlikeCount
        })();
      },
      (err) => {
        if (err?.response?.status === 409) {
          setIsOpen(true);
        }
      }
    );
  };
  return (
    <StyledContainer>
      <StyledIconBox>
        {!reaction?.reactionStatus || reaction.reactionStatus === 'UNHAPPY' ? (
          <AiOutlineLike
            cursor={'pointer'}
            onClick={onLikeClickHandler('HAPPY')}
          />
        ) : (
          <AiFillLike
            color={'var(--cyan-dark-500)'}
            cursor={'pointer'}
            onClick={onUnLikeClickHandler('HAPPY')}
          />
        )}
        <span>{likeCount}</span>
      </StyledIconBox>
      <StyledIconBox>
        {!reaction?.reactionStatus || reaction.reactionStatus === 'HAPPY' ? (
          <AiOutlineDislike
            cursor={'pointer'}
            onClick={onLikeClickHandler('UNHAPPY')}
          />
        ) : (
          <AiFillDislike
            color={'var(--cyan-dark-500)'}
            cursor={'pointer'}
            onClick={onUnLikeClickHandler('UNHAPPY')}
          />
        )}
        <span>{unlikeCount}</span>
      </StyledIconBox>
      <Modal
        isOpen={isOpen}
        closeModalHandlerWithConfirm={() => setIsOpen(false)}
        confirmMessage='이미 반응을 남겼습니다.'
      />
    </StyledContainer>
  );
};

export default Reaction;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
  font-size: 2rem;
  border-bottom: 1px solid #ddd;
  gap: 1rem;
`;

const StyledIconBox = styled.div`
  display: flex;
  color: #999;
  align-items: center;
  gap: 0.5rem;
  > span {
    font-size: 1.2rem;
  }
`;
