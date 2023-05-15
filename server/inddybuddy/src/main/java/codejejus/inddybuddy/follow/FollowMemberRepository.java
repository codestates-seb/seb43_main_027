package codejejus.inddybuddy.follow;

import codejejus.inddybuddy.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowMemberRepository extends JpaRepository<FollowMember, Long> {

    Optional<FollowMember> findByFollowerAndFollowing(Member follower, Member owner);

    @Query(value = "select m from FollowMember f inner join Member m " +
            "ON f.following.memberId = m.memberId where f.follower.memberId = :memberId")
    List<Member> findAllByFollower(@Param("memberId") Long memberId);

    @Query(value = "select m from FollowMember f inner join Member m " +
            "ON f.follower.memberId = m.memberId where f.following.memberId = :memberId")
    List<Member> findAllByFollowing(@Param("memberId") Long memberId);
}
