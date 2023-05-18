package codejejus.inddybuddy.like;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByMemberAndPost(Member member, Post post);
}
