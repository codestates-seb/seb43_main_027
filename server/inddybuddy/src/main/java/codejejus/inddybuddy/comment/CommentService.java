package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.notification.Alarm;
import codejejus.inddybuddy.notification.AlarmEvent;
import codejejus.inddybuddy.notification.AlarmType;
import codejejus.inddybuddy.post.Post;
import codejejus.inddybuddy.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final PostService postService;
    private final CommentMapper commentMapper;
    private final ApplicationEventPublisher eventPublisher;

    public CommentDto.Response createComment(MemberPrincipal memberPrincipal, CommentDto.Request requestDto, Long postId) {
        Post findPost = postService.findVerifidPost(postId);
        Comment comment = commentMapper.requestToEntity(requestDto);
        comment.setMember(memberPrincipal.getMember());
        comment.setPost(findPost);
        Comment save = commentRepository.save(comment);

        if (!memberPrincipal.getMember().equals(findPost.getMember())) {
            Alarm alarm = createAlarm(findPost, save, memberPrincipal.getMember());
            eventPublisher.publishEvent(new AlarmEvent(this, alarm));
        }

        return commentMapper.entityToResponse(save);
    }

    private Alarm createAlarm(Post post, Comment comment, Member sender) {
        AlarmType alarmType = (comment.getParentCommentId() == null) ? AlarmType.REPLY_COMMENT : AlarmType.REPLY_SUB_COMMENT;
        Member receiver = (alarmType == AlarmType.REPLY_COMMENT) ? post.getMember() : findVerifidComment(comment.getParentCommentId()).getMember();
        String content = (alarmType == AlarmType.REPLY_COMMENT) ? post.getMember().getUsername() + "님이 회원님의 게시물에 댓글을 달았습니다." : sender.getUsername() + "님의 회원님의 댓글에 댓글을 달았습니다.";

        return Alarm.builder()
                .alarmType(alarmType)
                .receiver(receiver)
                .sender(sender)
                .content(content)
                .post(post)
                .comment(comment)
                .build();
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
