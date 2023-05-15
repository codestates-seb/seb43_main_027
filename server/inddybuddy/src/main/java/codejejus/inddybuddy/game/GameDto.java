package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class GameDto {

    @Getter
    public static class Request {

        private String gameName;
        private String downloadUrl;
        private List<Category.CategoryName> categoryNames;
    }

    @Getter
    public static class Response {

        private Long gameId;
        private String gameName;
        private String downloadUrl;
        private String mainImgUrl;
        private List<Category> categories;
        private Long followerCount;
        private LocalDateTime createdAt;

        @Builder
        public Response(Long gameId, String gameName, String downloadUrl, String mainImgUrl, List<Category> categories, Long followerCount, LocalDateTime createdAt) {
            this.gameId = gameId;
            this.gameName = gameName;
            this.downloadUrl = downloadUrl;
            this.mainImgUrl = mainImgUrl;
            this.followerCount = followerCount;
            this.categories = categories;
            this.createdAt = createdAt;
        }
    }
}
