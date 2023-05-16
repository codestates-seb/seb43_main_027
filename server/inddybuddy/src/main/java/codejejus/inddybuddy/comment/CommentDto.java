package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.member.dto.MemberDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    public static class Post {

        private long memberId;
        @Setter
        private long postId;
        @NotBlank
        private String content;
    }

    @Getter
    public static class Patch {

        @Setter
        private Long commentId;
        @NotBlank
        private String content;
    }

    @Getter
    public static class Request {

        private Long commentId;
        private String content;
        private Long memberId;
        private Long parentCommentId;
    }

    @Getter
    public static class Response {

        private final Long commentId;
        private final MemberDto.SimpleInfoResponse member;
        private final String content;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;

        @Builder
        public Response(Long commentId, MemberDto.SimpleInfoResponse member, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.commentId = commentId;
            this.member = member;
            this.content = content;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    }
}
