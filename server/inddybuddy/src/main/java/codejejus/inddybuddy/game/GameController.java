package codejejus.inddybuddy.game;

import codejejus.inddybuddy.follow.FollowGameService;
import codejejus.inddybuddy.follow.FollowMember;
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
                                                       @RequestBody GameDto.Post postDto) {
        GameDto.Response gameResponse = gameService.createGame(memberPrincipal, postDto);
        return ResponseEntity.created(UriCreator.createURI(gameResponse.getGameId())).build();
    }

    @PatchMapping("/{game-id}")
    public ResponseEntity<SingleResponse<GameDto.Response>> modifyGame(@PathVariable("game-id") Long gameId,
                                                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                       @RequestBody GameDto.Patch patchDto) {
        return ResponseEntity.ok(new SingleResponse<>(gameService.modifyGame(gameId, memberPrincipal, patchDto)));
    }

    @GetMapping
    public ResponseEntity<MultiResponse<GameDto.Response>> getAllGames(@PageableDefault(page = 0, size = 30) Pageable pageable) {
        Page<GameDto.Response> pageGames = gameService.getAllGames(pageable);
        List<GameDto.Response> games = pageGames.getContent();
        return ResponseEntity.ok(new MultiResponse<>(games, pageGames));
    }

    @GetMapping("/popular")
    public ResponseEntity<MultiResponse<GameDto.Response>> getPopularGames(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        Page<GameDto.Response> pageGames = gameService.getPopularGames(pageable);
        List<GameDto.Response> games = pageGames.getContent();
        return ResponseEntity.ok(new MultiResponse<>(games, pageGames));
    }

    @GetMapping("/new")
    public ResponseEntity<MultiResponse<GameDto.Response>> getNewGames(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        Page<GameDto.Response> pageGames = gameService.getNewGames(pageable);
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
