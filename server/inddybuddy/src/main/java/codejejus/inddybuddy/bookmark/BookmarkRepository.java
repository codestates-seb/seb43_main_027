package codejejus.inddybuddy.bookmark;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByMemberAndPost(Member member, Post post);

    @EntityGraph(attributePaths = {"post", "post.member"})
    Page<Bookmark> findAllByMember(Member member, Pageable pageable);

    @EntityGraph(attributePaths = {"post", "post.member"})
    Page<Bookmark> findAllByMemberAndPost_PostTag(Member member, Post.PostTag postTag, Pageable pageable);
}
