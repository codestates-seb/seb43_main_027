package codejejus.inddybuddy.post;

import org.springframework.data.domain.Page;
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
    public PostDto.Response entityToResponse(Post post) {
        return PostDto.Response.builder()
                .postId(post.getPostId())
                .gameId(post.getGame().getGameId())
                .title(post.getTitle())
                .content(post.getContent())
                .postTag(post.getPostTag())
                .views(post.getViews())
                .build();
    }

    public Page<PostDto.Response> entityPageToResponsePage(Page<Post> postPage) {
        return postPage.map(this::entityToResponse);
    }
}

