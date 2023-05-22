package codejejus.inddybuddy.bookmark;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Builder;
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

    public void updateBookmarkStatus(BookmarkStatus bookmarkStatus) {
        this.bookmarkStatus = bookmarkStatus;
    }

    @Getter
    public enum BookmarkStatus {

        ACTIVE("활성화"), DISABLE("비활성화");
        private final String description;

        BookmarkStatus(String description) {
            this.description = description;
        }
    }

    @Builder
    public Bookmark(BookmarkStatus bookmarkStatus) {
        this.bookmarkStatus = bookmarkStatus;
    }

    public void update(Member member, Post post) {
        this.member = member;
        this.post = post;
    }
}
