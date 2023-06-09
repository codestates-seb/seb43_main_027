package codejejus.inddybuddy.game;

import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.global.constant.Constants;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.relation.gamecategory.GameCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(mappedBy = "game")
    @BatchSize(size = 100)
    private List<GameCategory> gameCategories = new ArrayList<>();

    public void addGameCategory(GameCategory gameCategory) {
        gameCategories.add(gameCategory);
        gameCategory.addGame(this);
    }

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

    public void updateGame(String gameName, String downloadUrl, String description) {
        if (gameName != null) {
            this.gameName = gameName;
        }
        if (downloadUrl != null) {
            this.downloadUrl = downloadUrl;
        }
        if (description != null) {
            this.description = description;
        }
    }
}
