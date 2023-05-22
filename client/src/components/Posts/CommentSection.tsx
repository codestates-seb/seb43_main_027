import styled from 'styled-components';
import { CommentType } from '../../types/dataTypes';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CommentSection = ({
  commentCount,
  comments,
  onCommentSubmit
}: {
  commentCount: number;
  comments: CommentType[];
  onCommentSubmit: () => void;
}) => {
  const user = useSelector((s: RootState) => s.user);
  return (
    <StyledContainer>
      <StyledCount>댓글 : {commentCount}</StyledCount>
      {user.memberId !== -1 && (
        <CommentInput onCommentSubmit={onCommentSubmit} />
      )}
      {comments.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.commentId}
          onCommentSubmit={onCommentSubmit}
        />
      ))}
    </StyledContainer>
  );
};

export default CommentSection;

const StyledContainer = styled.div`
  padding: 2rem 0;
`;

const StyledCount = styled.div`
  font-size: 1.4rem;
`;
