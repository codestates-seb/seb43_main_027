package codejejus.inddybuddy.post;

import codejejus.inddybuddy.comment.CommentDto;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post.PostTag;
import codejejus.inddybuddy.reaction.ReactionDto;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class PostDto {

    @Getter
    public static class PostRequest {
        private String title;
        private String content;
        private PostTag postTag;
    }

    @Getter
    public static class Patch {

        private String title;
        private String content;
        private PostTag postTag;
        private List<String> fileUrlList;
    }

    @Getter
    public static class Response {

        private final Long postId;
        private final Long gameId;
        private final MemberDto.SimpleInfoResponse member;
        private final String title;
        private final String content;
        private final PostTag postTag;
        private final Long views;
        private final Long likeCount;
        private final Long commentCount;
        private final List<String> fileUrlList;
        private final List<CommentDto.Response> comments;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;
        private ReactionDto.Response reaction;

        @Builder
        public Response(Long postId, Long gameId, MemberDto.SimpleInfoResponse member, String title, String content, Long views, PostTag postTag, Long likeCount, Long commentCount, List<String> fileUrlList, List<CommentDto.Response> comments, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.postId = postId;
            this.gameId = gameId;
            this.member = member;
            this.title = title;
            this.content = content;
            this.postTag = postTag;
            this.views = views;
            this.likeCount = likeCount;
            this.commentCount = commentCount;
            this.fileUrlList = fileUrlList;
            this.comments = comments;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        public void updateReaction(ReactionDto.Response reaction) {
            this.reaction = reaction;
        }
    }

    @Getter
    public static class SimpleResponse {

        private final Long postId;
        private final Long gameId;
        private final String userName;
        private final String title;
        private final String content;
        private final PostTag postTag;
        private final Long views;
        private final Long commentCount;
        private final Long likeCount;
        private final LocalDateTime createdAt;

        public SimpleResponse(Post post) {
            this.gameId = post.getGame().getGameId();
            this.postId = post.getPostId();
            this.userName = post.getMember().getUsername();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.views = post.getViews();
            this.postTag = post.getPostTag();
            this.commentCount = post.getCommentCount();
            this.likeCount = post.getLikeCount();
            this.createdAt = post.getCreatedAt();
        }
    }

    @Getter
    public static class MyPageResponse {

        private final Long postId;
        private final String username;
        private final Member.MemberStatus memberStatus;
        private final String title;
        private final PostTag postTag;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;

        public MyPageResponse(Post post) {
            this.postId = post.getPostId();
            this.username = post.getMember().getUsername();
            this.memberStatus = post.getMember().getMemberStatus();
            this.title = post.getTitle();
            this.postTag = post.getPostTag();
            this.createdAt = post.getCreatedAt();
            this.updatedAt = post.getUpdatedAt();
        }
    }
}
