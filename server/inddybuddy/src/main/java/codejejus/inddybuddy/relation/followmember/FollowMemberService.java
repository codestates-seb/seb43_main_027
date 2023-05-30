package codejejus.inddybuddy.relation.followmember;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.notification.Alarm;
import codejejus.inddybuddy.notification.AlarmEvent;
import codejejus.inddybuddy.notification.AlarmType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowMemberService {

    private final FollowMemberRepository followMemberRepository;
    private final ApplicationEventPublisher eventPublisher;

    public void following(Member follow, Member owner) {
        verifySelfFollow(follow, owner);
        verifyExistFollow(follow, owner);
        followMemberRepository.save(new FollowMember(follow, owner));

        Alarm alarm = Alarm.builder()
                .receiver(follow)
                .sender(owner)
                .content(owner.getUsername() + "님이 회원님을 팔로우 했습니다.")
                .alarmType(AlarmType.FOLLOW_REQUEST)
                .build();
        eventPublisher.publishEvent(new AlarmEvent(this, alarm));
    }

    public void unfollowing(Member follow, Member owner) {
        FollowMember findFollow = findVerifyFollow(follow, owner);
        followMemberRepository.delete(findFollow);
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
