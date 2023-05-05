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

    @Builder
    public Game(String gameName, String downloadUrl, String mainImageUrl, Member member, List<Category> categories) {
        this.gameName = gameName;
        this.downloadUrl = downloadUrl;
        this.mainImageUrl = mainImageUrl;
        this.member = member;
        this.categories = categories;
    }
}
