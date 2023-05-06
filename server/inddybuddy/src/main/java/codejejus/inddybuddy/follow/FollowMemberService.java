package codejejus.inddybuddy.follow;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowMemberService {

    private final FollowMemberRepository followMemberRepository;

    public void following(Member follow, Member owner) {
        verifyExistFollow(follow, owner);
        followMemberRepository.save(new FollowMember(follow, owner));
    }

    public void unfollowing(Member follow, Member owner) {
        FollowMember findFollow = findVerifyFollow(follow, owner);
        followMemberRepository.delete(findFollow);
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
