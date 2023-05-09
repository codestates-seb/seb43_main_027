package codejejus.inddybuddy.game;

import codejejus.inddybuddy.follow.FollowGameService;
import codejejus.inddybuddy.follow.FollowMember;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.dto.MultiResponse;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;
    private final FollowGameService followGameService;

    @PostMapping
    public ResponseEntity<GameDto.Response> createGame(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestBody GameDto.Request requestDto) {
        GameDto.Response gameResponse = gameService.createGame(memberPrincipal, requestDto);
        return ResponseEntity.created(UriCreator.createURI(gameResponse.getGameId())).build();
    }

    @PatchMapping("/{game-id}")
    public ResponseEntity<SingleResponse<GameDto.Response>> modifyGame(@PathVariable("game-id") Long gameId,
                                                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                       @RequestBody GameDto.Request requestDto) {
        return ResponseEntity.ok(new SingleResponse<>(gameService.modifyGame(gameId, memberPrincipal, requestDto)));
    }

    @GetMapping
    public ResponseEntity<MultiResponse<GameDto.Response>> getAllGames(@PageableDefault(page = 0, size = 30) Pageable pageable,
                                                                       @RequestParam(required = false) Filter filter) {
        Page<GameDto.Response> pageGames = gameService.getAllGames(pageable, filter);
        List<GameDto.Response> games = pageGames.getContent();
        return ResponseEntity.ok(new MultiResponse<>(games, pageGames));
    }

    @PostMapping("/{game_id}/follow")
    public ResponseEntity<FollowMember> followMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                     @PathVariable("game_id") Long gameId) {
        gameService.followGame(gameId, memberPrincipal);
        return ResponseEntity.created(UriCreator.createURI(gameId)).build();
    }

    @DeleteMapping("/{game_id}/unfollow")
    public ResponseEntity<FollowMember> unfollowMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @PathVariable("game_id") Long gameId) {
        gameService.unfollowGame(gameId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{game_id}/follower")
    public ResponseEntity<SingleResponse<List<MemberDto.MemberSimpleInfoResponse>>> getGameFollowers(@PathVariable("game_id") Long gameId) {
        List<Member> followers = followGameService.getAllFollowerByMemberId(gameId);
        return ResponseEntity.ok(new SingleResponse<>(MemberDto.getMemberSimpleInfoResponses(followers)));
    }
}
