package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Comment extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;
    @OneToMany(mappedBy = "parentComment", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<Comment> childComments = new ArrayList<>();
    //    @Column()
//    private Long parentCommentId;
    @Column(nullable = false, length = 1000)
    private String content;
    @Enumerated(EnumType.STRING)
    @Column(length = 30, nullable = false)
    private CommentStatus commentStatus = CommentStatus.COMMENT_REGISTRATION;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public Comment(String content, Member member) {

        this.content = content;
        this.member = member;
    }

    public void updateCommentStatus(CommentStatus commentStatus) {
        this.commentStatus = commentStatus;
    }

    public void updateComment(String content) {
        if (content != null) {
            this.content = content;
        }
    }

    public enum CommentStatus {

        COMMENT_REGISTRATION("댓글 등록"),
        COMMENT_DELETED("삭제된 댓글입니다.");
        @Getter
        private final String status;

        CommentStatus(String status) {
            this.status = status;
        }
    }
}
