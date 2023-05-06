package codejejus.inddybuddy.member.service;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.global.utils.AuthorityUtils;
import codejejus.inddybuddy.member.MemberRepository;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityUtils authorityUtils;

    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());
        verifyExistUsername(member.getUsername());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        member.setRoles(authorityUtils.createRoles(member.getEmail()));
        member.setImageUrl("default");
        return memberRepository.save(member);
    }

    public Member updateMember(Member member, MemberPrincipal memberPrincipal) {
        Member findMember = findVerifyMember(member.getMemberId());
        verifySameMember(findMember, memberPrincipal.getMember());
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(findMember::setMemberStatus);
        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);
        Optional.ofNullable(member.getUsername())
                .ifPresent(findMember::setUsername);
        Optional.ofNullable(member.getImageUrl())
                .ifPresent(findMember::setImageUrl);
        Optional.ofNullable(member.getAboutMe())
                .ifPresent(findMember::setAboutMe);
        return memberRepository.save(findMember);
    }

    public Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void deleteMember(Long memberId, MemberPrincipal memberPrincipal) {
        Member findMember = findVerifyMember(memberId);
        verifySameMember(findMember, memberPrincipal.getMember());
        findMember.updateMemberStatus(Member.MemberStatus.DELETE);
        memberRepository.save(findMember);
    }

    private Member findVerifyMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistEmail(String email) {
        boolean isExist = memberRepository.existsByEmail(email);
        if (isExist) {
            throw new CustomException(ExceptionCode.MEMBER_EMAIL_EXIST);
        }
    }

    private void verifyExistUsername(String username) {
        boolean isExist = memberRepository.existsByUsername(username);
        if (isExist) {
            throw new CustomException(ExceptionCode.MEMBER_USERNAME_EXIST);
        }
    }

    private void verifySameMember(Member member, Member memberPrincipal) {
        if (!member.getEmail().equals(memberPrincipal.getEmail())) {
            throw new CustomException(ExceptionCode.MEMBER_NOT_SAME);
        }
    }
}
