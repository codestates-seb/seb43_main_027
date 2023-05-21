package codejejus.inddybuddy.bookmark;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByMemberAndPost(Member member, Post post);
}
