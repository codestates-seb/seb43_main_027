package codejejus.inddybuddy.follow;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import codejejus.inddybuddy.member.Member;
import lombok.Getter;

@Entity
@Getter
public class FollowMember {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long followId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member follower;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member following;
}
