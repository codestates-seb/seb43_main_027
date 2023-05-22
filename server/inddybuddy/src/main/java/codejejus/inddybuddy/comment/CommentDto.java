package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.member.dto.MemberDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class CommentDto {

    @Getter
    public static class Request {

        private Long commentId;
        private Long postId;
        private String content;
        private Long memberId;
        private Long parentCommentId;
    }

    @Getter
    public static class Response {

        private final Long commentId;
        private final MemberDto.SimpleInfoResponse member;
        private final Long parentCommentId;
        private final List<CommentDto.Response> replies;
        private final String content;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;

        @Builder
        public Response(Long commentId, MemberDto.SimpleInfoResponse member, Long parentCommentId, List<CommentDto.Response> replies, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.commentId = commentId;
            this.member = member;
            this.parentCommentId = parentCommentId;
            this.replies = replies;
            this.content = content;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    }
}
