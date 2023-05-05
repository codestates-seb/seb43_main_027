package codejejus.inddybuddy.post;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Post extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PostId;
    @Column(nullable = false, length = 100)
    private String title;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    @Column(nullable = false)
    private Long views = 0L;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member memberId;
    @ManyToOne
    @JoinColumn(name = "GAME_ID")
    private Game gameId;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PostTag postTag = PostTag.RECRUITMENT;

    public enum PostTag {

        RECRUITMENT("모집"),
        BUG("버그"),
        WALKTHROUGH("공략"),
        CHIT_CHAT("수다"),
        INFORMATION("정보"),
        FAN_ART("팬아트"),
        QUESTION("질문"),
        SHOWING_OFF("자랑하기"),
        REVIEW("리뷰"),
        ETC("기타");

        @Getter
        private final String status;

        PostTag(String status) {
            this.status = status;
        }
    }
}
