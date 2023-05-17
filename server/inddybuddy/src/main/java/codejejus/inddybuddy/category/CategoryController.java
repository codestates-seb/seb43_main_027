package codejejus.inddybuddy.category;

import codejejus.inddybuddy.game.GameDto;
import codejejus.inddybuddy.global.dto.MultiResponse;
import codejejus.inddybuddy.global.dto.SingleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<SingleResponse<CategoryDto.Response>> createCategory(@RequestBody CategoryDto.Post postDto) {
        return ResponseEntity.ok(new SingleResponse<>(categoryService.createCategory(postDto)));
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto.Response>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{category-id}/games")
    public ResponseEntity<MultiResponse<GameDto.Response>> findGamesByCategory(@PathVariable("category-id") long categoryId,
                                                                               @PageableDefault(page = 1, size = 30) Pageable pageable,
                                                                               @RequestParam String filter) {
        Page<GameDto.Response> pageGames = categoryService.findGamesByCategory(categoryId, pageable, filter);
        List<GameDto.Response> games = pageGames.getContent();
        return ResponseEntity.ok(new MultiResponse<>(games, pageGames));
    }
}
