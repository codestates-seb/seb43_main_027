package codejejus.inddybuddy.category;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30, unique = true)
    private CategoryName categoryName;

    @Builder
    public Category(CategoryName categoryName) {
        this.categoryName = categoryName;
    }

    public enum CategoryName {

        FPS("FPS"), RPG("RPG"), ADVENTURE("어드벤쳐"), SHOOTING("슈팅"),
        SIMULATION("시뮬레이션"), ACTION("액션"), SPORTS("스포츠"),
        STRATEGY("전략"), CARD_AND_BOARD("카드 및 보드게임"), PUZZLE("퍼즐"),
        STORY("스토리"), HEALING("힐링"), HORROR("공포"),
        COMEDY("개그"), HACK_AND_SLASH("핵앤슬"), TURN_BASED("턴제"),
        SURVIVAL("생존"), MULTIPLAYER("멀티"), ROGUELIKE("로그라이크"),
        PLATFORMER("플랫포머"), TWO_D_GAME("2D 게임"), THREE_D_GAME("3D 게임"),
        MOBA("MOBA"), MOBILE("모바일"), OTHER("기타");

        @Getter
        private final String name;

        CategoryName(String name) {
            this.name = name;
        }
    }
}
