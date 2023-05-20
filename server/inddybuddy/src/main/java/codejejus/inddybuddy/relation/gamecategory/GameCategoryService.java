package codejejus.inddybuddy.relation.gamecategory;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.game.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameCategoryService {

    private final GameCategoryRepository gameCategoryRepository;

    public void createGameInCategory(Game game, List<Category> categories) {
        categories.forEach(category -> gameCategoryRepository.save(new GameCategory(game, category)));
    }

    public void modifyGameAndCategory(Game game, List<Category> patchCategories) {
        gameCategoryRepository.deleteAllByGame(game);
        createGameInCategory(game, patchCategories);
    }

    public List<Category> findCategoryByGame(Game game) {
        List<GameCategory> gameCategories = gameCategoryRepository.findAllByGame(game);
        return gameCategories.stream().map(GameCategory::getCategory).collect(Collectors.toList());
    }

    public Page<Game> findGamesByCategory(Category category, Pageable pageable) {
        Page<GameCategory> gameCategories = gameCategoryRepository.findAllByCategory(category, pageable);
        return gameCategories.map(GameCategory::getGame);
    }
}
