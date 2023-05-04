package codejejus.inddybuddy.member.service;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.MemberRepository;
import codejejus.inddybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        return memberRepository.save(member);
    }

    public Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new CustomException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void deleteMember(Long memberId) {
        memberRepository.deleteById(memberId);
    }
}
