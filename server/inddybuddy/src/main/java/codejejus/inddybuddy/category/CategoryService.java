package codejejus.inddybuddy.category;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.game.GameDto;
import codejejus.inddybuddy.game.GameMapper;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final GameMapper gameMapper;

    public CategoryDto.Response createCategory(CategoryDto.Post postDto) {
        Category category = categoryMapper.postToEntity(postDto);
        Category save = categoryRepository.save(category);
        return categoryMapper.entityToResponse(save);
    }

    public List<CategoryDto.Response> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        return categoryMapper.entityListToResponseList(allCategories);
    }

    public Page<GameDto.Response> findGamesByCategory(long categoryId, Pageable pageable) {
        Page<Game> gamePage = categoryRepository.findAllByCategoryId(categoryId, pageable);
        return gameMapper.entityPageToResponsePage(gamePage);
    }

    public Category findVerifiedCategory(Category.CategoryName categoryName) {
        Optional<Category> optionalCategory = categoryRepository.findByCategoryName(categoryName);
        Category findCategory =
                optionalCategory.orElseThrow(() -> new CustomException(ExceptionCode.CATEGORY_NOT_FOUND));
        return findCategory;
    }

    public List<Category> getCategoriesByName(List<Category.CategoryName> categoryNames) {
        return categoryNames.stream()
                .map(this::findVerifiedCategory)
                .collect(Collectors.toList());
    }
}
