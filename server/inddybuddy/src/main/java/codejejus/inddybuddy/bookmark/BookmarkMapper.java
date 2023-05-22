package codejejus.inddybuddy.bookmark;

import org.springframework.stereotype.Component;

@Component
public class BookmarkMapper {

    public Bookmark dtoToEntity(BookmarkDto.Request request) {
        return Bookmark.builder()
                .bookmarkStatus(request.getBookmarkStatus())
                .build();
    }

    public BookmarkDto.Response entityToResponse(Bookmark bookmark) {
        return BookmarkDto.Response.builder()
                .bookmarkId(bookmark.getBookmarkId())
                .postId(bookmark.getPost().getPostId())
                .memberId(bookmark.getMember().getMemberId())
                .bookmarkStatus(bookmark.getBookmarkStatus())
                .build();
    }
}
