package codejejus.inddybuddy.post;

import codejejus.inddybuddy.file.File;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PostMapper {

    public Post requestToEntity(PostDto.Request requestDto) {
        return Post.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
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
                .likeCount(post.getLikeCount())
                .fileUrlList(post.getFiles().stream().map(File::getFileUrl).collect(Collectors.toList()))
                .build();
    }

    public Page<PostDto.Response> entityPageToResponsePage(Page<Post> postPage) {
        return postPage.map(this::entityToResponse);
    }
}

