package codejejus.inddybuddy.category;

import lombok.Builder;
import lombok.Getter;


public class CategoryDto {

    @Getter
    public static class Post {

        private Category.CategoryName categoryName;
    }

    @Getter
    public static class Response {

        private final Long categoryId;
        private final Category.CategoryName categoryName;

        @Builder
        public Response(Long categoryId, Category.CategoryName categoryName) {
            this.categoryId = categoryId;
            this.categoryName = categoryName;
        }
    }
}
