package codejejus.inddybuddy.follow;

import codejejus.inddybuddy.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowMemberRepository extends JpaRepository<FollowMember, Long> {

    Optional<FollowMember> findByFollowerAndFollowing(Member follower, Member owner);
}
