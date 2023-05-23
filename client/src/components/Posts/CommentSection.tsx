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
  console.log(comments);
  const onCommentValueChange = (value: string) => {
    // TODO: 생성 시 결과값 받으면 바로 넣어야함
    onCommentSubmit({
      commentCount: commentCount + 1,
      comments: [
        ...comments,
        {
          member: {
            memberId: user.memberId,
            imageUrl: user.imageUrl,
            userName: user.userName
          },
          commentStatus: 'COMMENT_REGISTRATION',
          parentCommentId: -1,
          content: value,
          commentId: Date.now(),
          createdAt: Date().toString(),
          updatedAt: Date().toString(),
          replies: []
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
  const onCommentDelete = (commentId: number) => {
    console.log('deleted');
    onCommentSubmit({
      comments: comments.map((comment) =>
        comment.commentId === commentId
          ? {
              ...comment,
              commentStatus: 'COMMENT_DELETED'
            }
          : comment
      )
    })();
  };

  // TODO: 대댓글 추가 시 댓글 상태변경 구현 필요
  const onReCommentSubmit = (value: any, parentId: number) => {
    const newReply: CommentType = {
      commentId: Date.now(),
      commentStatus: 'COMMENT_REGISTRATION',
      content: value,
      member: {
        ...user,
        followerCount: 0,
        followingCount: 0
      },
      parentCommentId: parentId,
      replies: [],
      createdAt: Date().toString(),
      updatedAt: Date().toString()
    };
    onCommentSubmit({
      comments: comments.map((comment) =>
        comment.commentId === parentId
          ? { ...comment, replies: [...comment.replies, newReply] }
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
    onCommentSubmit({
      comments: comments.map((comment) =>
        comment.commentId === parentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.commentId === commentId
                  ? { ...reply, content: value }
                  : reply
              )
            }
          : comment
      )
    })();
  };

  const onReCommentDelete = (commentId: number, parentId: number) => {
    onCommentSubmit({
      comments: comments.map((comment) =>
        comment.commentId === parentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.commentId === commentId
                  ? { ...reply, commentStatus: 'COMMENT_DELETED' }
                  : reply
              )
            }
          : comment
      )
    })();
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
          onCommentDelete={onCommentDelete}
          onReCommentSubmit={onReCommentSubmit}
          onReCommentUpdate={onReCommentUpdate}
          onReCommentDelete={onReCommentDelete}
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
