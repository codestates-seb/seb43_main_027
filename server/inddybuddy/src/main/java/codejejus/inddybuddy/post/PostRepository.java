package codejejus.inddybuddy.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    @EntityGraph(attributePaths = {"member"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<Post> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"member", "member.file"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<Post> findAllByPostTag(Post.PostTag postTag, Pageable pageable);

    @EntityGraph(attributePaths = {"member", "member.file"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<Post> findAllByContentContainingOrTitleContaining(String content, String title, Pageable pageable);
}

