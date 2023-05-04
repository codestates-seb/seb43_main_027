package codejejus.inddybuddy.follow;

import codejejus.inddybuddy.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

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
