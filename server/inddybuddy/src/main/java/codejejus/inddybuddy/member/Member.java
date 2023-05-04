package codejejus.inddybuddy.member;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import codejejus.inddybuddy.global.audit.Timestamped;
import lombok.Getter;

@Entity
@Getter
public class Member extends Timestamped {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;
	@Column(nullable = false, length = 45, unique = true)
	private String email;
	@Column(nullable = false, length = 100)
	private String password;
	@Column(nullable = false, length = 45, unique = true)
	private String username;
	// TODO: S3 연결 후 기본 이미지 URL 설정
	@Column(nullable = false)
	private String imageUrl = "default";
	private String aboutMe;
	@Column(nullable = false)
	private MemberStatus memberStatus = MemberStatus.ACTIVE;

	public enum MemberStatus {

		ACTIVE("활성화"),
		DISABLED("비활성화"),
		DELETE("회원 삭제");

		@Getter
		private final String status;

		MemberStatus(String status) {
			this.status = status;
		}
	}
}
