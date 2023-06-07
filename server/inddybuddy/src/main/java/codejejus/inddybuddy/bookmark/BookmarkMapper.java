package codejejus.inddybuddy.bookmark;

import codejejus.inddybuddy.post.Post;
import codejejus.inddybuddy.post.PostDto;
import codejejus.inddybuddy.post.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class BookmarkMapper {

    private final PostMapper postMapper;

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

    public Page<PostDto.MyPageResponse> bookmarkToPost(Page<Bookmark> bookmarkPage) {
        List<Post> postList = bookmarkPage.stream()
                .filter(bookmark -> bookmark.getBookmarkStatus().equals(Bookmark.BookmarkStatus.ACTIVE))
                .map(Bookmark::getPost)
                .collect(Collectors.toList());
        Page<Post> postPage = new PageImpl<>(postList, bookmarkPage.getPageable(), postList.size());
        return postMapper.entityToMyPageResponse(postPage);
    }
}
