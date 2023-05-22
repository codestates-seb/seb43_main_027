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

const Reaction = ({
  reaction,
  likeCount,
  unlikeCount,
  onReactionChange
}: {
  reaction: ReactionType | null;
  likeCount: number;
  unlikeCount: number;
  onReactionChange: () => void;
}) => {
  const { postId } = useParams();

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
        onReactionChange();
      },
      (err) => {
        if (err?.response?.status === 409) {
          alert('이미 좋아요를 눌렀습니다.');
        }
      }
    );
  };
  const onUnLikeClickHandler = () => {
    deleteData(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/unreaction`,
      {
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      },
      () => {
        onReactionChange();
      },
      (err) => {
        if (err?.response?.status === 409) {
          alert('이미 좋아요를 눌렀습니다.');
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
            onClick={onUnLikeClickHandler}
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
            onClick={onUnLikeClickHandler}
          />
        )}
        <span>{unlikeCount}</span>
      </StyledIconBox>
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