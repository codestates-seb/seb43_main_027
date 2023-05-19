package codejejus.inddybuddy.post;

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
import codejejus.inddybuddy.reaction.ReactionDto;
import codejejus.inddybuddy.reaction.ReactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final MemberService memberService;
    private final GameService gameService;
    private final PostMapper postMapper;
    private final FileService fileService;
    private final ReactionService reactionService;

    public PostDto.Response createPost(Long gameId, MemberPrincipal memberPrincipal, PostDto.PostRequest postDto, List<MultipartFile> multipartFiles) {
        Post post = postMapper.postToEntity(postDto);
        post.setGame(gameService.findGame(gameId));
        post.setMember(memberPrincipal.getMember());
        if (multipartFiles != null) {
            List<File> files = fileService.createFiles(multipartFiles, post);
            files.forEach(post::addFile);
        }
        Post save = postRepository.save(post);
        return postMapper.entityToResponse(save);
    }

    public PostDto.Response modifyPost(Long postId, MemberPrincipal memberPrincipal, PostDto.Patch patchDto, List<MultipartFile> multipartFiles) {
        Post findPost = findVerifidPost(postId);
        memberService.verifySameMember(findPost.getMember(), memberPrincipal.getMember());
        if (multipartFiles != null) {
            fileService.deletePostFilesByPatchFileUrl(findPost, findPost.getFiles(), patchDto.getFileUrlList());
            List<File> files = fileService.createFiles(multipartFiles, findPost);
            files.forEach(findPost::addFile);
        }
        findPost.updatePost(patchDto.getTitle(), patchDto.getContent(), patchDto.getPostTag());
        return postMapper.entityToResponse(findPost);
    }

    @Transactional(readOnly = true)
    public PostDto.Response findPost(Long postId, MemberPrincipal memberPrincipal) {
        Post post = findVerifidPost(postId);
        PostDto.Response response = postMapper.entityToResponse(post);

        if (memberPrincipal != null) {
            ReactionDto.Response reaction = reactionService.findReaction(memberPrincipal.getMember(), post);
            if (reaction == null) {
                return response;
            }
            response.updateReaction(reaction);
        }
        return response;
    }

    @Transactional(readOnly = true)
    public Page<PostDto.SimpleResponse> getAllPosts(Long gameId, Pageable pageable, Post.PostTag postTag, String filter) {
        Game findGame = gameService.findGame(gameId);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Filter.getMatchedSort(filter));
        Page<Post> postPage = postTag == null ?
                postRepository.findAllByGame(findGame, pageRequest) :
                postRepository.findAllByGameAndPostTag(findGame, postTag, pageRequest);
        return postMapper.entityPageToSimpleResponsePage(postPage);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.SimpleResponse> getPostsByKeyword(String keyword, Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize());
        Page<Post> allByContainingKeyword =
                postRepository.findAllByContentContainingOrTitleContaining(keyword, keyword, pageRequest);
        return postMapper.entityPageToSimpleResponsePage(allByContainingKeyword);
    }

    public Page<PostDto.MyPageResponse> getPostsByMember(Long memberId, Pageable pageable) {
        Member member = memberService.findMember(memberId);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize());
        Page<Post> postPage = postRepository.findAllByMember(member, pageRequest);
        return postMapper.entityToMyPageResponse(postPage);
    }

    public void deletePost(Long postId, MemberPrincipal memberPrincipal) {
        Post findPost = findVerifidPost(postId);
        memberService.verifySameMember(findPost.getMember(), memberPrincipal.getMember());
        postRepository.delete(findPost);
        fileService.deletePostFiles(findPost);
    }

    private void verifyPost(Post post) {
        Long memberId = post.getMember().getMemberId();
        memberService.findMember(memberId);
    }

    public Post findVerifidPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElseThrow(() -> new CustomException(ExceptionCode.POST_NOT_FOUND));
    }
}
