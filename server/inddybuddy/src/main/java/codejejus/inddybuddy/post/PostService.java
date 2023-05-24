package codejejus.inddybuddy.post;

import codejejus.inddybuddy.bookmark.Bookmark;
import codejejus.inddybuddy.bookmark.BookmarkDto;
import codejejus.inddybuddy.bookmark.BookmarkMapper;
import codejejus.inddybuddy.bookmark.BookmarkRepository;
import codejejus.inddybuddy.file.File;
import codejejus.inddybuddy.file.FileService;
import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.game.GameService;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.reaction.Reaction;
import codejejus.inddybuddy.reaction.ReactionDto;
import codejejus.inddybuddy.reaction.ReactionMapper;
import codejejus.inddybuddy.reaction.ReactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final ReactionRepository reactionRepository;
    private final BookmarkRepository bookmarkRepository;
    private final MemberService memberService;
    private final GameService gameService;
    private final FileService fileService;
    private final PostMapper postMapper;
    private final ReactionMapper reactionMapper;
    private final BookmarkMapper bookmarkMapper;

    public PostDto.Response createPost(Long gameId, MemberPrincipal memberPrincipal, PostDto.PostRequest postDto, List<MultipartFile> multipartFiles) {
        Post post = postMapper.postToEntity(postDto);
        post.setGame(gameService.findGame(gameId));
        post.setMember(memberPrincipal.getMember());
        Optional.ofNullable(multipartFiles)
                .ifPresent(files -> {
                    List<File> createdFiles = fileService.createFiles(files, post);
                    createdFiles.forEach(post::addFile);
                });
        Post save = postRepository.save(post);
        return postMapper.entityToResponse(save);
    }

    public PostDto.Response modifyPost(Long postId, MemberPrincipal memberPrincipal, PostDto.Patch patchDto, List<MultipartFile> multipartFiles) {
        Post findPost = findVerifidPost(postId);
        memberService.verifySameMember(findPost.getMember(), memberPrincipal.getMember());
        fileService.deletePostFilesByPatchFileUrl(findPost, findPost.getFiles(), patchDto.getFileUrlList());
        Optional.ofNullable(multipartFiles)
                .ifPresent(files -> {
                    List<File> createdFiles = fileService.createFiles(files, findPost);
                    createdFiles.forEach(findPost::addFile);
                });
        findPost.updatePost(patchDto.getTitle(), patchDto.getContent(), patchDto.getPostTag());

        PostDto.Response response = postMapper.entityToResponse(findPost);
        applyLoginMemberReaction(memberPrincipal, findPost, response);
        applyLoginMemberBookmark(memberPrincipal, findPost, response);
        return response;
    }

    public PostDto.Response findPost(Long postId, MemberPrincipal memberPrincipal) {
        Post post = findVerifidPost(postId);
        postRepository.updateViewCount(post.getViews() + 1, post.getPostId());
        PostDto.Response response = postMapper.entityToResponse(post);
        Optional.ofNullable(memberPrincipal)
                .ifPresent(member -> {
                    applyLoginMemberReaction(member, post, response);
                    applyLoginMemberBookmark(member, post, response);
                });
        return response;
    }

    private void applyLoginMemberBookmark(MemberPrincipal memberPrincipal, Post post, PostDto.Response response) {
        BookmarkDto.Response bookmark = findBookmark(memberPrincipal.getMember(), post);
        Optional.ofNullable(bookmark)
                .ifPresent(response::updateBookmark);
    }

    private void applyLoginMemberReaction(MemberPrincipal memberPrincipal, Post post, PostDto.Response response) {
        ReactionDto.Response reaction = findReaction(memberPrincipal.getMember(), post);
        Optional.ofNullable(reaction)
                .ifPresent(response::updateReaction);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.SimpleResponse> getAllPosts(Long gameId, Pageable pageable, Post.PostTag postTag, String filter) {
        Game findGame = gameService.findGame(gameId);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Filter.getMatchedSort(filter));
        Page<Post> postPage = Optional.ofNullable(postTag)
                .map(tag -> postRepository.findAllByGameAndPostTag(findGame, tag, pageRequest))
                .orElseGet(() -> postRepository.findAllByGame(findGame, pageRequest));
        return postMapper.entityPageToSimpleResponsePage(postPage);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.SimpleResponse> getPostsByKeyword(Pageable pageable, String keyword) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize());
        Page<Post> allByContainingKeyword =
                postRepository.findAllByContentContainingOrTitleContaining(keyword, keyword, pageRequest);
        return postMapper.entityPageToSimpleResponsePage(allByContainingKeyword);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.MyPageResponse> getPostsByMember(Long memberId, Post.PostTag postTag, Pageable pageable) {
        Member member = memberService.findMember(memberId);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt", "postId"));
        Page<Post> postPage = Optional.ofNullable(postTag)
                .map(tag -> postRepository.findAllByMemberAndPostTag(member, tag, pageRequest))
                .orElseGet(() -> postRepository.findAllByMember(member, pageRequest));
        return postMapper.entityToMyPageResponse(postPage);
    }

    public void deletePost(Long postId, MemberPrincipal memberPrincipal) {
        Post findPost = findVerifidPost(postId);
        memberService.verifySameMember(findPost.getMember(), memberPrincipal.getMember());
        postRepository.delete(findPost);
        fileService.deletePostFiles(findPost);
    }

    public Post findVerifidPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElseThrow(() -> new CustomException(ExceptionCode.POST_NOT_FOUND));
    }

    private ReactionDto.Response findReaction(Member member, Post post) {
        Optional<Reaction> optionalReaction = reactionRepository.findByMemberAndPost(member, post);
        if (optionalReaction.isEmpty()) return null;
        Reaction reaction = optionalReaction.get();
        return reactionMapper.entityToResponse(reaction);
    }

    private BookmarkDto.Response findBookmark(Member member, Post post) {
        Optional<Bookmark> optionalBookmark = bookmarkRepository.findByMemberAndPost(member, post);
        if (optionalBookmark.isEmpty()) return null;
        Bookmark bookmark = optionalBookmark.get();
        return bookmarkMapper.entityToResponse(bookmark);
    }
}
