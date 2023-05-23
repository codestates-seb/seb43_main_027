package codejejus.inddybuddy.message;

import codejejus.inddybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query(value = "select m from Message m " +
            "where (m.sender = :sender and m.receiver = :receiver) or (m.receiver = :sender and m.sender = :receiver)")
    Page<Message> findAllMessages(Member sender, Member receiver, Pageable pageable);

    @EntityGraph(attributePaths = {"sender", "receiver"})
    @Query(value = "SELECT distinct m FROM Message m " +
            "where m.sender = :member or m.receiver = :member")
    Set<Message> findAllByMessageMembers(Member member);
}
