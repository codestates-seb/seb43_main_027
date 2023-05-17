package codejejus.inddybuddy.post;

import codejejus.inddybuddy.file.File;
import codejejus.inddybuddy.file.FileService;
import codejejus.inddybuddy.game.GameService;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
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

    public PostDto.Response createPost(MemberPrincipal memberPrincipal, PostDto.Request requestDto, List<MultipartFile> multipartFiles) {  // 단순한 생성 방식
        Post post = postMapper.requestToEntity(requestDto);
        post.setPostTag(requestDto.getPostTag());
        post.setGame(gameService.findGame(requestDto.getGameId()));
        post.setMember(memberPrincipal.getMember());
        if (multipartFiles != null) {
            List<File> files = fileService.createFiles(multipartFiles, post);
            post.setFiles(files);
        }
        Post save = postRepository.save(post);
        return postMapper.entityToResponse(save);
    }

    public PostDto.Response modifyPost(Long postId, MemberPrincipal memberPrincipal, PostDto.Request requestDto, List<MultipartFile> multipartFiles) {
        Post findPost = findVerifidPost(postId);
        memberService.verifySameMember(findPost.getMember(), memberPrincipal.getMember()); // 회원 검증
        // Todo : 미리 등록한 이미지 S3에서 삭제
        if (multipartFiles != null) fileService.createFiles(multipartFiles, findPost);
        findPost.updatePost(requestDto.getTitle(), requestDto.getContent(), requestDto.getPostTag());
        return postMapper.entityToResponse(findPost);
    }

    @Transactional(readOnly = true)
    public PostDto.Response findPost(Long postId) {
        Post post = findVerifidPost(postId);
        return postMapper.entityToResponse(post);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.SimpleResponse> getAllPosts(Pageable pageable, Post.PostTag postTag, String filter) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Filter.getMatchedSort(filter));
        Page<Post> postPage = postTag == null ?
                postRepository.findAll(pageRequest) :
                postRepository.findAllByPostTag(postTag, pageRequest);
        return postMapper.entityPageToSimpleResponsePage(postPage);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.SimpleResponse> getPostsByKeyword(String keyword, Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize());
        Page<Post> allByContainingKeyword = postRepository.findAllByContentContainingOrTitleContaining(keyword, keyword, pageRequest);
        return postMapper.entityPageToSimpleResponsePage(allByContainingKeyword);
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
