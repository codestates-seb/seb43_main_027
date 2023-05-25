package codejejus.inddybuddy.game;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    Page<Game> findByGameNameContaining(Pageable pageable, String keyword);

    boolean existsByGameName(String gameName);
}
