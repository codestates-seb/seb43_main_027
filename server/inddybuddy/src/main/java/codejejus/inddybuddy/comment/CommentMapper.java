package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CommentMapper {

    private final MemberMapper memberMapper;
    private final CommentRepository commentRepository;

    public Comment requestToEntity(CommentDto.Request requestDto) {
        Comment comment = Comment.builder()
                .parentCommentId(requestDto.getParentCommentId())
                .content(requestDto.getContent())
                .build();

        return comment;
    }

    public CommentDto.Response entityToResponse(Comment comment) {

        List<Comment> replies = commentRepository.findAllByParentCommentId(comment.getCommentId());
        List<CommentDto.Response> childResponse = replies.stream()
                .map(this::entityToResponse)
                .collect(Collectors.toList());

        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .parentCommentId(comment.getParentCommentId())
                .replies(childResponse)
                .member(memberMapper.getMemberSimpleInfoResponse(comment.getMember()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}
