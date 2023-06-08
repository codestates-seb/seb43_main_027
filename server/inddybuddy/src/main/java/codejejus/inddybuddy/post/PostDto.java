package codejejus.inddybuddy.post;

import codejejus.inddybuddy.bookmark.BookmarkDto;
import codejejus.inddybuddy.comment.CommentDto;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post.PostTag;
import codejejus.inddybuddy.reaction.ReactionDto;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class PostDto {

    @Getter
    public static class PostRequest {

        @NotBlank
        private String title;
        @NotBlank
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
        private final String gameName;
        private final MemberDto.SimpleInfoResponse member;
        private final String title;
        private final String content;
        private final PostTag postTag;
        private Long views;
        private final Long likeCount;
        private final Long unlikeCount;
        private final Long commentCount;
        private final List<String> fileUrlList;
        private final List<CommentDto.Response> comments;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;
        private ReactionDto.Response reaction;
        private BookmarkDto.Response bookmark;

        @Builder
        public Response(Long postId, Long gameId, String gameName, MemberDto.SimpleInfoResponse member, String title, String content, Long views, PostTag postTag, Long likeCount, Long unlikeCount, Long commentCount, List<String> fileUrlList, List<CommentDto.Response> comments, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.postId = postId;
            this.gameId = gameId;
            this.gameName = gameName;
            this.member = member;
            this.title = title;
            this.content = content;
            this.postTag = postTag;
            this.views = views;
            this.likeCount = likeCount;
            this.unlikeCount = unlikeCount;
            this.commentCount = commentCount;
            this.fileUrlList = fileUrlList;
            this.comments = comments;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        public void updateReaction(ReactionDto.Response reaction) {
            this.reaction = reaction;
        }

        public void updateBookmark(BookmarkDto.Response bookmark) {
            this.bookmark = bookmark;
        }


        public void addView() {
            this.views += 1;
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
        private final String userName;
        private final Member.MemberStatus memberStatus;
        private final String title;
        private final PostTag postTag;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;
        private final Long gameId;
        private final Long likeCount;
        private final Long views;
        private final Long commentCount;


        public MyPageResponse(Post post) {
            this.postId = post.getPostId();
            this.userName = post.getMember().getUsername();
            this.memberStatus = post.getMember().getMemberStatus();
            this.title = post.getTitle();
            this.postTag = post.getPostTag();
            this.createdAt = post.getCreatedAt();
            this.updatedAt = post.getUpdatedAt();
            this.gameId = post.getGame().getGameId();
            this.likeCount = post.getLikeCount();
            this.views = post.getViews();
            this.commentCount = post.getCommentCount();
        }
    }
}
