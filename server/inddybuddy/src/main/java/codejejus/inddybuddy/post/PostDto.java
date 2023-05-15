package codejejus.inddybuddy.post;

import codejejus.inddybuddy.comment.CommentDto;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.post.Post.PostTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

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
        private MemberDto.MemberSimpleInfoResponse member;
        private String title;
        private String content;
        private long views;
        private PostTag postTag;
        private Long likeCount;
        private List<String> fileUrlList;
        private List<CommentDto.Response> comments;

        @Builder
        public Response(Long postId, Long gameId, MemberDto.MemberSimpleInfoResponse member, String title, String content, Long views, PostTag postTag, Long likeCount, List<String> fileUrlList, List<CommentDto.Response> comments) {

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
}
