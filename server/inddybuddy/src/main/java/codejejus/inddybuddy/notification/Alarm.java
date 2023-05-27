package codejejus.inddybuddy.notification;

import codejejus.inddybuddy.comment.Comment;
import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Alarm extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RECEIVER_ID")
    private Member receiver;
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SENDER_ID")
    private Member sender;
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;
    @Enumerated(EnumType.STRING)
    private AlarmType alarmType;
    private String content;
    @Column(nullable = false)
    private Boolean isRead;

    @Builder
    public Alarm(Member receiver, Member sender, Post post, Comment comment, AlarmType alarmType, String content) {
        this.receiver = receiver;
        this.sender = sender;
        this.post = post;
        this.comment = comment;
        this.alarmType = alarmType;
        this.content = content;
        this.isRead = false;
    }
}
