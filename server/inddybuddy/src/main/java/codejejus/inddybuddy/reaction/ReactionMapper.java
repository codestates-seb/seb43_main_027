package codejejus.inddybuddy.reaction;

import org.springframework.stereotype.Component;

@Component
public class ReactionMapper {

    public Reaction dtoToEntity(ReactionDto.Request request) {
        return Reaction.builder()
                .reactionStatus(request.getReactionStatus())
                .build();
    }

    public ReactionDto.Response entityToResponse(Reaction reaction) {
        return ReactionDto.Response.builder()
                .reactionId(reaction.getReactionId())
                .postId(reaction.getPost().getPostId())
                .memberId(reaction.getMember().getMemberId())
                .reactionStatus(reaction.getReactionStatus())
                .build();
    }
}
