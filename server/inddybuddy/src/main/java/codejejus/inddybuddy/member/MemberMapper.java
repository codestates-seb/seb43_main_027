package codejejus.inddybuddy.member;

import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.message.MessageDto;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberDtoPostToMember(MemberDto.Post post);

    Member memberDtoPatchToMember(MemberDto.Patch patch);

    MemberDto.Response memberToMemberDtoResponse(Member member);

    MemberDto.ProfileResponse memberToMemberProfileDtoResponse(Member member);

    default List<MemberDto.SimpleInfoResponse> getMemberSimpleInfoResponses(List<Member> members) {
        return members.stream()
                .map(this::getMemberSimpleInfoResponse)
                .collect(Collectors.toList());
    }

    default MemberDto.SimpleInfoResponse getMemberSimpleInfoResponse(Member member) {
        return new MemberDto.SimpleInfoResponse(member);
    }

    default Page<MemberDto.SimpleInfoResponse> pageMemberToSimpleInfoResponses(Page<Member> page) {
        return page.map(this::getMemberSimpleInfoResponse);
    }

    default List<MemberDto.MessageResponse> memberResponseToSimpleInfoResponses(List<MessageDto.MemberResponse> memberResponses) {
        return memberResponses.stream().map(MemberDto.MessageResponse::new).collect(Collectors.toList());
    }
}
