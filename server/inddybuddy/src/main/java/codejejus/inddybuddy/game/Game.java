package codejejus.inddybuddy.game;

import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.global.constant.Constants;
import codejejus.inddybuddy.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Game extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    @Column(length = 100, unique = true)
    private String gameName;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String downloadUrl;
    private String mainImageUrl = Constants.GAME_DEFAULT_IMG;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @Formula("(select count(*) from follow_game fg where fg.game_id = game_id)")
    private Long followerCount;

    @Builder
    public Game(String gameName, String downloadUrl, String description, Member member) {
        this.gameName = gameName;
        this.downloadUrl = downloadUrl;
        this.description = description;
        this.member = member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    public void updateGame(String gameName, String downloadUrl) {
        if (gameName != null) {
            this.gameName = gameName;
        }
        if (downloadUrl != null) {
            this.downloadUrl = downloadUrl;
        }
    }
}
