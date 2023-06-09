package codejejus.inddybuddy.relation.gamecategory;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.game.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameCategoryRepository extends JpaRepository<GameCategory, Long> {

    @EntityGraph(attributePaths = {"game"})
    Page<GameCategory> findAllByCategory(Category category, Pageable pageable);

    void deleteAllByGame(Game game);

    List<GameCategory> findAllByGame(Game game);
}
