package codejejus.inddybuddy.category;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.game.GameDto;
import codejejus.inddybuddy.game.GameMapper;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.relation.gamecategory.GameCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final GameMapper gameMapper;
    private final GameCategoryService gameCategoryService;

    public List<CategoryDto.Response> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        return categoryMapper.entityListToResponseList(allCategories);
    }

    public Page<GameDto.Response> findGamesByCategory(Long categoryId, Pageable pageable, String filter) {
        Category category = findVerifiedCategory(categoryId);
        Page<Game> gamePage = gameCategoryService.findGamesByCategory(category, PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Filter.getMatchedSort(filter)));
        return gameMapper.entityPageToResponsePage(gamePage);
    }

    public Category findVerifiedCategory(Category.CategoryName categoryName) {
        Optional<Category> optionalCategory = categoryRepository.findByCategoryName(categoryName);
        return optionalCategory.orElseThrow(() -> new CustomException(ExceptionCode.CATEGORY_NOT_FOUND));
    }

    public List<Category> getCategoriesByName(List<Category.CategoryName> categoryNames) {
        return categoryNames.stream()
                .map(this::findVerifiedCategory)
                .collect(Collectors.toList());
    }

    public Category findVerifiedCategory(Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        return optionalCategory.orElseThrow(() -> new CustomException(ExceptionCode.CATEGORY_NOT_FOUND));
    }
}
