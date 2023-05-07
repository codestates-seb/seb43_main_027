package codejejus.inddybuddy.category;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {

    public CategoryDto.Response entityToResponse(Category category) {
        return CategoryDto.Response.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .game(category.getGame())
                .build();
    }

    public List<CategoryDto.Response> entityListToResponseList(List<Category> allCategories) {
        return allCategories.stream().map(this::entityToResponse).collect(Collectors.toList());
    }
}
