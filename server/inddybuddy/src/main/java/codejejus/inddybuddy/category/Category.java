package codejejus.inddybuddy.category;

import javax.persistence.*;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.global.audit.Timestamped;
import lombok.Getter;

@Entity
@Getter
public class Category extends Timestamped {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long categoryId;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 30)
	private CategoryName categoryName;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "game_id")
	private Game game;

	public enum CategoryName {

		FPS("FPS"),
		RPG("RPG"),
		ADVENTURE("어드벤쳐"),
		SHOOTING("슈팅"),
		SIMULATION("시뮬레이션"),
		ACTION("액션"),
		SPORTS("스포츠"),
		PUZZLE("퍼즐");

		@Getter
		private final String name;

		CategoryName(String name) {
			this.name = name;
		}
	}
}
