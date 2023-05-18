package codejejus.inddybuddy.reaction;

import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Reaction extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reactionId;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ReactionStatus reactionStatus;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public enum ReactionStatus {

        HAPPY("좋아요"),
        UNHAPPY("싫어요");
        private String description;

        ReactionStatus(String description) {
            this.description = description;
        }
    }

    @Builder
    public Reaction(Long reactionId, ReactionStatus reactionStatus) {
        this.reactionId = reactionId;
        this.reactionStatus = reactionStatus;
    }

    public void update(Member member, Post post) {
        this.member = member;
        this.post = post;
    }
}
