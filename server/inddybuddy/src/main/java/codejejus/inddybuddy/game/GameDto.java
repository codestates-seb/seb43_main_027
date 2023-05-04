package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.member.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class GameDto {

    @Getter
    public static class Base {
        private String gameName;
        private String downloadUrl;
        private String mainImgUrl;
        private Member member;
        private List<Category> categories;
    }

    public static class Response {
        private Long gameId;
        private String gameName;
        private String downloadUrl;
        private String mainImgUrl;
        private List<Category> categories;

        @Builder
        public Response(Long gameId, String gameName, String downloadUrl, String mainImgUrl, List<Category> categories) {
            this.gameId = gameId;
            this.gameName = gameName;
            this.downloadUrl = downloadUrl;
            this.mainImgUrl = mainImgUrl;
            this.categories = categories;
        }
    }
}
