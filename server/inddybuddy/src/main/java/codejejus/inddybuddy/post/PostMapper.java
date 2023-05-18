package codejejus.inddybuddy.post;

import codejejus.inddybuddy.comment.CommentMapper;
import codejejus.inddybuddy.file.File;
import codejejus.inddybuddy.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostMapper {

    private final CommentMapper commentMapper;
    private final MemberMapper memberMapper;

    public Post postToEntity(PostDto.PostRequest postDto) {
        return Post.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .postTag(postDto.getPostTag())
                .build();
    }

    public PostDto.Response entityToResponse(Post post) {
        return PostDto.Response.builder()
                .postId(post.getPostId())
                .gameId(post.getGame().getGameId())
                .member(memberMapper.getMemberSimpleInfoResponse(post.getMember()))
                .title(post.getTitle())
                .content(post.getContent())
                .postTag(post.getPostTag())
                .views(post.getViews())
                .likeCount(post.getLikeCount())
                .commentCount(post.getCommentCount())
                .fileUrlList(post.getFiles().stream().map(File::getFileUrl).collect(Collectors.toList()))
                .comments(post.getComments().stream().map(commentMapper::entityToResponse).collect(Collectors.toList()))
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    public PostDto.SimpleResponse entityToSimpleResponse(Post post) {
        return new PostDto.SimpleResponse(post);
    }

    public Page<PostDto.SimpleResponse> entityPageToSimpleResponsePage(Page<Post> postPage) {
        return postPage.map(this::entityToSimpleResponse);
    }
}

