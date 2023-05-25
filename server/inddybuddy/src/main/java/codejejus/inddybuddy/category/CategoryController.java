package codejejus.inddybuddy.category;

import codejejus.inddybuddy.game.GameDto;
import codejejus.inddybuddy.global.dto.MultiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDto.Response>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{category-id}/games")
    public ResponseEntity<MultiResponse<GameDto.Response>> findGamesByCategory(@PathVariable("category-id") @Valid @Positive long categoryId,
                                                                               @RequestParam(required = false) String filter,
                                                                               @PageableDefault(page = 1, size = 30) Pageable pageable) {
        Page<GameDto.Response> pageGames = categoryService.findGamesByCategory(categoryId, pageable, filter);
        List<GameDto.Response> games = pageGames.getContent();
        return ResponseEntity.ok(new MultiResponse<>(games, pageGames));
    }
}
