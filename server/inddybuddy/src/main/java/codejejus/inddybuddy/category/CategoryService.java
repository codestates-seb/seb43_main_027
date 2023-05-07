package codejejus.inddybuddy.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDto.Response> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        return categoryMapper.entityListToResponseList(allCategories);
    }
}
