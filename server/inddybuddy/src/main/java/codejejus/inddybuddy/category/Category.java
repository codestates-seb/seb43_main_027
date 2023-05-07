package codejejus.inddybuddy.category;

import javax.persistence.*;

import codejejus.inddybuddy.game.Game;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

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
	@JsonIgnore
	@ManyToMany(mappedBy = "categories")
	private List<Game> games;

	@Builder
	public Category(CategoryName categoryName) {
		this.categoryName = categoryName;
	}

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
