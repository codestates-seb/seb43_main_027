package codejejus.inddybuddy.bookmark;

import codejejus.inddybuddy.bookmark.Bookmark.BookmarkStatus;
import lombok.Builder;
import lombok.Getter;

public class BookmarkDto {
    @Getter
    public static class Request {

        private BookmarkStatus bookmarkStatus;
    }

    @Getter
    public static class Response {

        private final Long bookmarkId;
        private final Long postId;
        private final Long memberId;
        private final BookmarkStatus bookmarkStatus;

        @Builder
        public Response(Long bookmarkId, Long postId, Long memberId, BookmarkStatus bookmarkStatus) {
            this.bookmarkId = bookmarkId;
            this.postId = postId;
            this.memberId = memberId;
            this.bookmarkStatus = bookmarkStatus;
        }
    }
}
