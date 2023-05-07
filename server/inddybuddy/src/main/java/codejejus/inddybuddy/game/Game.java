package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Game extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    @Column(length = 100)
    private String gameName;
    private String downloadUrl;
    private String mainImageUrl = "default";
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @OneToMany(mappedBy = "game")
    private List<Category> categories;
    @OneToMany(mappedBy = "game")
    private List<Member> followers;

    @Builder
    public Game(String gameName, String downloadUrl, String mainImageUrl, Member member, List<Category> categories) {
        this.gameName = gameName;
        this.downloadUrl = downloadUrl;
        this.mainImageUrl = mainImageUrl;
        this.member = member;
        this.categories = categories;
    }

    public void updateGame(String gameName, String downloadUrl, String mainImageUrl, List<Category> categories) {
        if (gameName != null) {
            this.gameName = gameName;
        }
        if (downloadUrl != null) {
            this.downloadUrl = downloadUrl;
        }
        if (mainImageUrl != null) {
            this.mainImageUrl = mainImageUrl;
        }
        if (categories != null) {
            this.categories = categories;
        }
    }
}
