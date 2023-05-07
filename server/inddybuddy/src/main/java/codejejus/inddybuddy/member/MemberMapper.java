package codejejus.inddybuddy.member;

import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberDtoPostToMember(MemberDto.Post post);

    Member memberDtoPatchToMember(MemberDto.Patch patch);

    MemberDto.Response memberToMemberDtoResponse(Member member);

    MemberDto.ProfileResponse memberToMemberProfileDtoResponse(Member member,
                                                               Long followerCount,
                                                               Long followingCount,
                                                               List<Member> followers,
                                                               List<Member> followings);
}
