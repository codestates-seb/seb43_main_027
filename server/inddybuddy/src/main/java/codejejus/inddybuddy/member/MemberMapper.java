package codejejus.inddybuddy.member;

import codejejus.inddybuddy.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberDtoPostToMember(MemberDto.Post post);

    Member memberDtoPatchToMember(MemberDto.Patch patch);

    MemberDto.Response memberToMemberDtoResponse(Member member);
}
