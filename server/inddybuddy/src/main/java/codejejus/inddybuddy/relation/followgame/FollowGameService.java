package codejejus.inddybuddy.relation.followgame;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowGameService {

    private final FollowGameRepository followGameRepository;

    public void following(Game game, Member follower) {
        verifyExistFollow(game, follower);
        followGameRepository.save(new FollowGame(follower, game));
    }

    public void unfollowing(Game game, Member follower) {
        FollowGame findFollow = findVerifyFollow(game, follower);
        followGameRepository.delete(findFollow);
    }

    public List<Member> getAllFollowerByMemberId(Long gameId) {
        return followGameRepository.findAllByFollower(gameId);
    }

    public List<Game> getAllFollowGame(Long memberId) {
        return followGameRepository.findAllByGame(memberId);
    }

    private FollowGame findVerifyFollow(Game game, Member follow) {
        return followGameRepository.findByGameAndFollower(game, follow)
                .orElseThrow(() -> new CustomException(ExceptionCode.FOLLOW_NOT_FOUND));
    }

    private void verifyExistFollow(Game game, Member follower) {
        Optional<FollowGame> findFollow = followGameRepository.findByGameAndFollower(game, follower);
        if (findFollow.isPresent()) {
            throw new CustomException(ExceptionCode.ALREADY_EXIST_FOLLOW);
        }
    }
}
