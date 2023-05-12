package codejejus.inddybuddy.post;

import codejejus.inddybuddy.like.Like;
import codejejus.inddybuddy.post.Post.PostTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class PostDto {

    @Getter
    public static class Request {
        // TODO : , 게시글 제목, 게시글 내용, 게시글 태그?, 첨부 파일(null) 리스트, 게임 이름?, 멤버 아이디
        private String title;
        private long gameId;
        private String content;
        private PostTag postTag;
        public void addGameId(Long gameId) {
            this.gameId = gameId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long postId;
        private long gameId;
        private String title;
        private String content;
        private long views;
        private PostTag postTag;
        private List<Like> likes;
//        private long memberId;

        @Builder
        public Response(Long postId, Long gameId, String title, String content, Long views, PostTag postTag, List<Like> likes) {
            this.postId = postId;
            this.gameId = gameId;
            this.title = title;
            this.content = content;
            this.postTag = postTag;
            this.views = views;
            this.likes = likes;
        }
    }

    @Getter
    public static class Post {

        private long memberId;
        private long gameId;
        @NotBlank
        private String title;
        @NotBlank
        private String content;

        public void addGameId(Long gameId) {
            this.gameId = gameId;
        }
    }

    @Getter
    public static class Patch {
        @Setter
        private Long postId;
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }
}
