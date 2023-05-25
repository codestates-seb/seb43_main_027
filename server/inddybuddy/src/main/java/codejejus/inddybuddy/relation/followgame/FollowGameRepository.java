package codejejus.inddybuddy.relation.followgame;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowGameRepository extends JpaRepository<FollowGame, Long> {

    Optional<FollowGame> findByGameAndFollower(Game game, Member follower);

    @Query(value = "select m from FollowGame f inner join Member m " +
            "ON f.follower.memberId = m.memberId where f.game.gameId = :gameId")
    List<Member> findAllByFollower(@Param("gameId") Long gameId);

    @Query(value = "select g from FollowGame f inner join Game g " +
            "ON f.game.gameId = g.gameId where f.follower.memberId = :memberId")
    List<Game> findAllByGame(@Param("memberId") Long memberId);

    Long countByGame(Game game);
}
