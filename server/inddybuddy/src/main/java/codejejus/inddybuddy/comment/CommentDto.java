package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.member.dto.MemberDto;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class CommentDto {

    @Getter
    public static class Request {

        private Long commentId;
        private Long postId;
        @NotBlank
        private String content;
        private Long memberId;
        private Long parentCommentId;
    }

    @Getter
    public static class Response {

        private final Long commentId;
        private final Comment.CommentStatus commentStatus;
        private final MemberDto.SimpleInfoResponse member;
        private final Long parentCommentId;
        private final String content;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;
        private final List<CommentDto.Response> replies;

        @Builder
        public Response(Long commentId, Comment.CommentStatus commentStatus, MemberDto.SimpleInfoResponse member, Long parentCommentId, List<CommentDto.Response> replies, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.commentId = commentId;
            this.commentStatus = commentStatus;
            this.member = member;
            this.parentCommentId = parentCommentId;
            this.content = content;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.replies = replies;
        }
    }
}
