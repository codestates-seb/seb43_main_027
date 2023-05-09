package codejejus.inddybuddy.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("FROM Post  p where p.postStatus <> 'POST_DELEDTED' AND p.postId = :postId")
    Optional<Post> findByIdNotDeleted(Long postId);
}


