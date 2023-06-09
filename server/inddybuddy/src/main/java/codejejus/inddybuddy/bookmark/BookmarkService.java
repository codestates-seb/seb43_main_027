package codejejus.inddybuddy.bookmark;

import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.post.Post;
import codejejus.inddybuddy.post.PostDto;
import codejejus.inddybuddy.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final PostService postService;
    private final BookmarkMapper bookmarkMapper;
    private final MemberService memberService;

    public BookmarkDto.Response createBookmark(MemberPrincipal memberPrincipal, BookmarkDto.Request request, Long postId) {
        Member member = memberService.findMember(memberPrincipal.getMember().getMemberId());
        Post post = postService.findVerifidPost(postId);
        Bookmark bookmark;
        if (isBookmarkExists(member, post)) {
            bookmark = verifyExistBookmarkActive(member, post);
            bookmark.updateBookmarkStatus(Bookmark.BookmarkStatus.ACTIVE);
        } else {
            bookmark = bookmarkMapper.dtoToEntity(request);
            bookmark.update(member, post);
        }
        Bookmark save = bookmarkRepository.save(bookmark);
        return bookmarkMapper.entityToResponse(save);
    }

    public void deleteBookmark(MemberPrincipal memberPrincipal, Long postId) {
        Member member = memberService.findMember(memberPrincipal.getMember().getMemberId());
        Post post = postService.findVerifidPost(postId);
        Bookmark findBookmark = findVerifiedBookmark(member, post);
        memberService.verifySameMember(memberPrincipal.getMember(), findBookmark.getMember());
        findBookmark.updateBookmarkStatus(Bookmark.BookmarkStatus.DISABLE);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.MyPageResponse> getBookmarkPostsByMember(Long memberId, MemberPrincipal memberPrincipal, Post.PostTag postTag, Pageable pageable) {
        Member member = memberService.findMember(memberId);
        memberService.verifySameMember(member, memberPrincipal.getMember());
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Filter.NEW.getSort());
        Page<Bookmark> bookmarkPage = Optional.ofNullable(postTag)
                .map(tag -> bookmarkRepository.findAllByMemberAndPost_PostTag(member, tag, pageRequest))
                .orElseGet(() -> bookmarkRepository.findAllByMember(member, pageRequest));
        return bookmarkMapper.bookmarkToPost(bookmarkPage);
    }

    private boolean isBookmarkExists(Member member, Post post) {
        Optional<Bookmark> optionalBookmark = bookmarkRepository.findByMemberAndPost(member, post);
        return optionalBookmark.isPresent();
    }

    private Bookmark verifyExistBookmarkActive(Member member, Post post) {
        Optional<Bookmark> optionalBookmark = bookmarkRepository.findByMemberAndPost(member, post);
        if (optionalBookmark.isPresent() && optionalBookmark.get().getBookmarkStatus().equals(Bookmark.BookmarkStatus.ACTIVE)) {
            throw new CustomException(ExceptionCode.ALREADY_EXIST_BOOKMARK);
        }
        return optionalBookmark.get();
    }

    private Bookmark findVerifiedBookmark(Member member, Post post) {
        return bookmarkRepository.findByMemberAndPost(member, post)
                .orElseThrow(() -> new CustomException(ExceptionCode.BOOKMARK_NOT_FOUND));
    }
}
