package codejejus.inddybuddy.member;

import codejejus.inddybuddy.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
