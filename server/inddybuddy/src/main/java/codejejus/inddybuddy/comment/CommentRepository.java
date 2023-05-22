package codejejus.inddybuddy.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findAll(Pageable pageable);
    List<Comment> findAllByParentCommentId(Long parentComment);
}
