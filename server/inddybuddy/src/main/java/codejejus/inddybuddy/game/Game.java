package codejejus.inddybuddy.game;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
	private String mainImgUrl = "default";
	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;
	@OneToMany(mappedBy = "game")
	private List<Category> categories;

	@Builder
	public Game(String gameName, String downloadUrl, String mainImgUrl, Member member, List<Category> categories) {
		this.gameName = gameName;
		this.downloadUrl = downloadUrl;
		this.mainImgUrl = mainImgUrl;
		this.member = member;
		this.categories = categories;
	}
}
