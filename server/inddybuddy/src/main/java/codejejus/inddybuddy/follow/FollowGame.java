package codejejus.inddybuddy.follow;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class FollowGame extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id")
    private Member follower;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    public FollowGame(Member follower, Game game) {
        this.follower = follower;
        this.game = game;
    }
}
