package codejejus.inddybuddy.like;

import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "likes")
@Getter
@NoArgsConstructor
public class Like extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private LikeStatus likeStatus;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public enum LikeStatus {

        LIKE("좋아요"), DISLIKE("싫어요");
        private String description;

        LikeStatus(String description) {
            this.description = description;
        }
    }

    @Builder
    public Like(Long likeId, LikeStatus likeStatus) {
        this.likeId = likeId;
        this.likeStatus = likeStatus;
    }

    public void update(Member member, Post post) {
        this.member = member;
        this.post = post;
    }
}
