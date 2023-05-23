package codejejus.inddybuddy.reaction;

import codejejus.inddybuddy.reaction.Reaction.ReactionStatus;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class ReactionDto {

    @Getter
    public static class Request {

        @NotBlank
        private ReactionStatus reactionStatus;
    }

    @Getter
    public static class Response {

        private final Long reactionId;
        private final Long postId;
        private final Long memberId;
        private final ReactionStatus reactionStatus;

        @Builder
        public Response(Long reactionId, Long postId, Long memberId, ReactionStatus reactionStatus) {
            this.reactionId = reactionId;
            this.postId = postId;
            this.memberId = memberId;
            this.reactionStatus = reactionStatus;
        }
    }
}
