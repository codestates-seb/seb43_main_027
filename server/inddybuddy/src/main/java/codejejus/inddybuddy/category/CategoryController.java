package codejejus.inddybuddy.category;

import codejejus.inddybuddy.global.dto.SingleResponse;
import lombok.RequiredArgsConstructor;
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
}
