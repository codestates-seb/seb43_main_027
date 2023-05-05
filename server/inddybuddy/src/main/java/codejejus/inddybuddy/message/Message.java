package codejejus.inddybuddy.message;

import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Message extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private Member sender;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private Member receiver;
}
