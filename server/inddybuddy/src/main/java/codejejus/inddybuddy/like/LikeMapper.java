package codejejus.inddybuddy.like;

import org.springframework.stereotype.Component;

@Component
public class LikeMapper {

    public Like dtoToEntity(LikeDto.Request likeDto) {
        return Like.builder()
                .likeStatus(likeDto.getLikeStatus())
                .build();
    }

    public LikeDto.Response entityToResponse(Like like) {
        return LikeDto.Response.builder()
                .likeId(like.getLikeId())
                .postId(like.getPost().getPostId())
                .memberId(like.getMember().getMemberId())
                .likeStatus(like.getLikeStatus())
                .build();
    }
}
