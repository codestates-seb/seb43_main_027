package codejejus.inddybuddy.post;

import codejejus.inddybuddy.comment.Comment;
import codejejus.inddybuddy.file.File;
import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Post extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @Column(nullable = false, length = 100)
    private String title;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    @Column(nullable = false)
    private Long views = 0L;
    @Formula("(select count(*) from likes l where l.post_id=post_id)")
    private Long likeCount = 0L;
    @Formula("(select count(*) from comment c where c.post_id=post_id)")
    private Long commentCount = 0L;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @BatchSize(size = 10)
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    @BatchSize(size = 10)
    private Game game;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PostTag postTag = PostTag.RECRUITMENT;
    @OneToMany(mappedBy = "post")
    private List<File> files = new ArrayList<>();
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    public Post(String title, String content, PostTag postTag) {

        this.title = title;
        this.content = content;
        this.postTag = postTag;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void addFile(File file) {
        this.files.add(file);
    }

    public void deleteFile(File file) {
        this.files.remove(file);
    }

    public void updatePost(String title, String content, PostTag postTag) {
        if (title != null) {
            this.title = title;
        }
        if (content != null) {
            this.content = content;
        }
        if (postTag != null) {
            this.postTag = postTag;
        }
    }

    public enum PostTag {

        RECRUITMENT("모집"),
        BUG("버그"),
        WALKTHROUGH("공략"),
        CHIT_CHAT("수다"),
        INFORMATION("정보"),
        FAN_ART("팬아트"),
        QUESTION("질문"),
        SHOWING_OFF("자랑하기"),
        REVIEW("리뷰"),
        ETC("기타");

        @Getter
        private final String status;

        PostTag(String status) {
            this.status = status;
        }
    }
}
