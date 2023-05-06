package codejejus.inddybuddy.follow;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowMemberService {

    private final FollowMemberRepository followMemberRepository;

    public void following(Member follow, Member owner) {
        verifySelfFollow(follow, owner);
        verifyExistFollow(follow, owner);
        followMemberRepository.save(new FollowMember(follow, owner));
    }

    public void unfollowing(Member follow, Member owner) {
        FollowMember findFollow = findVerifyFollow(follow, owner);
        followMemberRepository.delete(findFollow);
    }

    public Long getFollowingCount(Member owner) {
        return followMemberRepository.countByFollowing(owner);
    }

    public Long getFollowerCount(Member follow) {
        return followMemberRepository.countByFollower(follow);
    }

    public List<Member> getAllFollowerByMemberId(Long memberId) {
        return followMemberRepository.findAllByFollower(memberId);
    }

    public List<Member> getAllFollowingByMemberId(Long memberId) {
        return followMemberRepository.findAllByFollowing(memberId);
    }

    private void verifySelfFollow(Member follow, Member owner) {
        if (follow.getEmail().equals(owner.getEmail())) {
            throw new CustomException(ExceptionCode.CANT_FOLLOW_SELF);
        }
    }

    private FollowMember findVerifyFollow(Member follow, Member owner) {
        return followMemberRepository.findByFollowerAndFollowing(follow, owner)
                .orElseThrow(() -> new CustomException(ExceptionCode.FOLLOW_NOT_FOUND));
    }

    private void verifyExistFollow(Member follow, Member owner) {
        Optional<FollowMember> findFollow = followMemberRepository.findByFollowerAndFollowing(follow, owner);
        if (findFollow.isPresent()) {
            throw new CustomException(ExceptionCode.ALREADY_EXIST_FOLLOW);
        }
    }
}
