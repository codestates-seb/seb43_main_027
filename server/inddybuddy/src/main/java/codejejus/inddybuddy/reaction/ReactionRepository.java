package codejejus.inddybuddy.reaction;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    Optional<Reaction> findByMemberAndPost(Member member, Post post);
}
