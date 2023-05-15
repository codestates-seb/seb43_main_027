package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.member.dto.MemberDto;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public Comment requestToEntity(CommentDto.Request requestDto) {
        return Comment.builder()
                .content(requestDto.getContent())
                .build();
    }

    public CommentDto.Response entityToResponse(Comment comment) {
        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .member(MemberDto.getMemberSimpleInfoResponse(comment.getMember()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}
