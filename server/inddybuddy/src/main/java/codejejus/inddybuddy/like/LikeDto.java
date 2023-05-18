package codejejus.inddybuddy.like;

import lombok.Builder;
import lombok.Getter;

public class LikeDto {

    @Getter
    public static class Request {

        private Like.LikeStatus likeStatus;
    }

    @Getter
    public static class Response {

        private final Long likeId;
        private final Long postId;
        private final Long memberId;
        private final Like.LikeStatus likeStatus;

        @Builder
        public Response(Long likeId, Long postId, Long memberId, Like.LikeStatus likeStatus) {
            this.likeId = likeId;
            this.postId = postId;
            this.memberId = memberId;
            this.likeStatus = likeStatus;
        }
    }
}
