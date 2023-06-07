package codejejus.inddybuddy.member;

import codejejus.inddybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Page<Member> findByUsernameContaining(Pageable pageable, String keyword);
}