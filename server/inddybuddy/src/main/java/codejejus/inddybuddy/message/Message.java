package codejejus.inddybuddy.message;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.Member;
import lombok.Getter;

@Entity
@Getter
public class Message extends Timestamped {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long messageId;
	@Column(columnDefinition = "TEXT", nullable = false)
	private String content;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sender_id")
	private Member sender;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "receiver_id")
	private Member receiver;
}
