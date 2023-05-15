package codejejus.inddybuddy.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findAll(Pageable pageable);
    Page<Comment> findByParentComment(Long parentComment, Pageable pageable);
}
