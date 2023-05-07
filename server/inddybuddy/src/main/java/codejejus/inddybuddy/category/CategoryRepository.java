package codejejus.inddybuddy.category;

import codejejus.inddybuddy.game.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryName(Category.CategoryName categoryName);

    @Query("SELECT g FROM Game g JOIN g.categories c WHERE c.categoryId = :categoryId ORDER BY g.gameId DESC")
    Page<Game> findAllByCategoryId(Long categoryId, Pageable pageable);
}
