package codejejus.inddybuddy.category;

import codejejus.inddybuddy.game.Game;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

public class CategoryDto {
    @Getter
    public static class Response {

        private Long categoryId;
        private Category.CategoryName categoryName;
        private Game game;

        @Builder
        public Response(Long categoryId, Category.CategoryName categoryName, Game game) {
            this.categoryId = categoryId;
            this.categoryName = categoryName;
            this.game = game;
        }
    }
}
