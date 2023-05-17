package codejejus.inddybuddy.post;

import codejejus.inddybuddy.comment.CommentDto;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.post.Post.PostTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class PostDto {

    @Getter
    public static class Request {

        private String title;
        private Long gameId;
        private String content;
        private PostTag postTag;

        public void addGameId(Long gameId) {
            this.gameId = gameId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private Long postId;
        private Long gameId;
        private MemberDto.SimpleInfoResponse member;
        private String title;
        private String content;
        private long views;
        private PostTag postTag;
        private Long likeCount;
        private List<String> fileUrlList;
        private List<CommentDto.Response> comments;

        @Builder
        public Response(Long postId, Long gameId, MemberDto.SimpleInfoResponse member, String title, String content, Long views, PostTag postTag, Long likeCount, List<String> fileUrlList, List<CommentDto.Response> comments) {

            this.postId = postId;
            this.gameId = gameId;
            this.member = member;
            this.title = title;
            this.content = content;
            this.postTag = postTag;
            this.views = views;
            this.likeCount = likeCount;
            this.fileUrlList = fileUrlList;
            this.comments = comments;
        }
    }

    @Getter
    public static class SimpleResponse {

        private final Long postId;
        private final MemberDto.SimpleInfoResponse member;
        private final String title;
        private final String content;
        private final Long views;
        private final PostTag postTag;
        private final Long commentCount;
        private final Long likeCount;

        public SimpleResponse(Post post) {
            this.postId = post.getPostId();
            this.member = new MemberDto.SimpleInfoResponse(post.getMember());
            this.title = post.getTitle();
            this.content = post.getContent();
            this.views = post.getViews();
            this.postTag = post.getPostTag();
            this.commentCount = post.getCommentCount();
            this.likeCount = post.getLikeCount();
        }
    }
}
