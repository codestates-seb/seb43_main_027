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
  onCommentSubmit: (s: any) => () => void;
}) => {
  const user = useSelector((s: RootState) => s.user);

  const onCommentValueChange = (value: string) => {
    onCommentSubmit({
      comments: [
        ...comments,
        {
          member: {
            memberId: user.memberId,
            imageUrl: user.imageUrl,
            userName: user.userName
          },
          content: value,
          commentId: Date.now(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    })();
  };
  const onCommentUpdate = (value: string, commentId: number) => {
    onCommentSubmit({
      comments: comments.map((comment) =>
        comment.commentId === commentId
          ? {
              ...comment,
              content: value
            }
          : comment
      )
    })();
  };

  // TODO: 대댓글 추가 시 댓글 상태변경 구현 필요
  const onReCommentSubmit = (value: any, parentId: number) => {
    onCommentSubmit({
      comments: comments.map((comment) =>
        comment.commentId === parentId
          ? {
              member: {
                memberId: user.memberId,
                imageUrl: user.imageUrl,
                userName: user.userName
              },
              content: value,
              commentId: Date.now(),
              createdAt: new Date(),
              updatedAt: new Date()
            }
          : comment
      )
    })();
  };

  // TODO: 대댓글 수정 시 댓글 상태변경 구현 필요
  const onReCommentUpdate = (
    value: string,
    commentId: number,
    parentId: number
  ) => {
    console.log('test');
  };

  return (
    <StyledContainer>
      <StyledCount>댓글 : {commentCount}</StyledCount>
      {user.memberId !== -1 && (
        <CommentInput onCommentSubmit={onCommentValueChange} />
      )}
      {comments.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.commentId}
          onCommentSubmit={onCommentUpdate}
          onReCommentSubmit={onReCommentSubmit}
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
