package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.global.constant.Constants;
import codejejus.inddybuddy.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
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
    private String downloadUrl;
    private String mainImageUrl = Constants.GAME_DEFAULT_IMG;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @Formula("(select count(*) from follow_game fg where fg.game_id = game_id)")
    private Long followerCount;
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "Game_Category",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories;

    @Builder
    public Game(String gameName, String downloadUrl, Member member) {
        this.gameName = gameName;
        this.downloadUrl = downloadUrl;
        this.member = member;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    public void updateGame(String gameName, String downloadUrl, List<Category> categories) {
        if (gameName != null) {
            this.gameName = gameName;
        }
        if (downloadUrl != null) {
            this.downloadUrl = downloadUrl;
        }
        if (categories != null) {
            this.categories = categories;
        }
    }
}
