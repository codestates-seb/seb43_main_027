package codejejus.inddybuddy.post;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

//@Mapper(componentModel = "spring")
@Component
public class PostMapper {

    public Post requestToEntity(PostDto.Request requestDto) {
        return Post.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
//                .fileList(requestDto.getFileList())
                .build();
    }
    public PostDto.Response entityToReesponse(Post post) {
        return PostDto.Response.builder()
                .postId(post.getPostId())
                .gameId(post.getGame().getGameId())
                .title(post.getTitle())
                .content(post.getContent())
                .postTag(post.getPostTag())
                .views(post.getViews())
                .build();
    }
}

// Interface로 만들 때
//@Mapper(componentModel = "spring")
//public interface PostMapper {
//
//    Post postDtoPostToPost(PostDto.Post post);
//    Post postDtoPatchToPost(PostDto.Patch patch);
//    PostDto.Response postToPostDtoResponse(Post post);
//}
