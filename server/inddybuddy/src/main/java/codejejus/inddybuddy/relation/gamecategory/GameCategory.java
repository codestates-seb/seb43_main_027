package codejejus.inddybuddy.relation.gamecategory;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.global.audit.Timestamped;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class GameCategory extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameCategoryId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @Formula("(select count(*) from follow_game fg join game g on g.game_id = fg.game_id where g.game_id = game_id)")
    private Long followerCount;

    public GameCategory(Game game, Category category) {
        this.game = game;
        this.category = category;
    }
}
