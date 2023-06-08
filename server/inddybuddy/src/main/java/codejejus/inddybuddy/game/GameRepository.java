package codejejus.inddybuddy.game;

import codejejus.inddybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    Page<Game> findByGameNameContaining(Pageable pageable, String keyword);

    List<Game> findAllByMember(Member member);

    boolean existsByGameName(String gameName);
}
