package codejejus.inddybuddy.bookmark;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId;
    @Enumerated(EnumType.STRING)
    private BookmarkStatus bookmarkStatus;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public enum BookmarkStatus {
        ACTIVE("활성화"), DISABLE("비활성화");
        private String description;

        BookmarkStatus(String description) {
            this.description = description;
        }
    }
}
