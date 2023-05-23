package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.post.Post;
import codejejus.inddybuddy.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final PostService postService;
    private final CommentMapper commentMapper;

    public CommentDto.Response createComment(MemberPrincipal memberPrincipal, CommentDto.Request requestDto, Long postId) {
        Post findPost = postService.findVerifidPost(postId);
        Comment comment = commentMapper.requestToEntity(requestDto);
        comment.setMember(memberPrincipal.getMember());
        comment.setPost(findPost);
        Comment save = commentRepository.save(comment);

        return commentMapper.entityToResponse(save);
    }

    public CommentDto.Response getComment(Long commentId) {
        Comment comment = findVerifidComment(commentId);
        return commentMapper.entityToResponse(comment);
    }

    public CommentDto.Response modifyComment(Long commentId, MemberPrincipal memberPrincipal, CommentDto.Request requestDto) {
        Comment findComment = findVerifidComment(commentId);
        memberService.verifySameMember(findComment.getMember(), memberPrincipal.getMember());
        findComment.updateComment(requestDto.getContent());
        return commentMapper.entityToResponse(findComment);
    }

    public void deleteComment(Long commentId, MemberPrincipal memberPrincipal) {
        Comment findComment = findVerifidComment(commentId);
        memberService.verifySameMember(findComment.getMember(), memberPrincipal.getMember());
        findComment.setCommentStatus(Comment.CommentStatus.COMMENT_DELETED);
    }
    private Comment findVerifidComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        return optionalComment.orElseThrow(() -> new CustomException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
