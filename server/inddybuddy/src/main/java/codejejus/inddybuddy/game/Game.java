package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.follow.FollowGame;
import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private String downloadUrl;
    private String mainImageUrl = "default";
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @OneToMany(mappedBy = "game")
    private List<FollowGame> followers;
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "Game_Category",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories;

    public void addCategory(Category category) {
        this.categories.add(category);
    }

    @Builder
    public Game(String gameName, String downloadUrl, String mainImageUrl, Member member, List<Category> categories) {
        this.gameName = gameName;
        this.downloadUrl = downloadUrl;
        this.mainImageUrl = mainImageUrl;
        this.member = member;
        this.categories = new ArrayList<>();
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
