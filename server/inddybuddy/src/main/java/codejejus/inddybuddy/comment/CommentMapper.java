package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentMapper {

    private final MemberMapper memberMapper;

    public Comment requestToEntity(CommentDto.Request requestDto) {
        return Comment.builder()
                .content(requestDto.getContent())
                .build();
    }

    public CommentDto.Response entityToResponse(Comment comment) {
        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .member(memberMapper.getMemberSimpleInfoResponse(comment.getMember()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}
