package codejejus.inddybuddy.member;

import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberDtoPostToMember(MemberDto.Post post);

    Member memberDtoPatchToMember(MemberDto.Patch patch);

    MemberDto.Response memberToMemberDtoResponse(Member member);

    @Mapping(source = "username", target = "userName")
    MemberDto.ProfileResponse memberToMemberProfileDtoResponse(Member member);

    default List<MemberDto.SimpleInfoResponse> getMemberSimpleInfoResponses(List<Member> members) {
        return members.stream()
                .map(this::getMemberSimpleInfoResponse)
                .collect(Collectors.toList());
    }

    default MemberDto.SimpleInfoResponse getMemberSimpleInfoResponse(Member member) {
        return new MemberDto.SimpleInfoResponse(member);
    }

    default List<MemberDto.SimpleInfoResponse> pageMemberToSimpleInfoResponses(List<Member> page) {
        return page.stream().map(this::getMemberSimpleInfoResponse).collect(Collectors.toList());
    }
}
