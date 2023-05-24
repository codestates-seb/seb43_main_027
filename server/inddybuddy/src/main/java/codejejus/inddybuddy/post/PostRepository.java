package codejejus.inddybuddy.post;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByContentContainingOrTitleContaining(String content, String title, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<Post> findAllByGame(Game game, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<Post> findAllByGameAndPostTag(Game game, Post.PostTag postTag, PageRequest pageRequest);

    Page<Post> findAllByMemberAndPostTag(Member member, Post.PostTag postTag, Pageable pageable);

    Page<Post> findAllByMember(Member member, Pageable pageable);
}
