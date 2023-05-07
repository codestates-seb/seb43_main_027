package codejejus.inddybuddy.game;

import codejejus.inddybuddy.follow.FollowGameService;
import codejejus.inddybuddy.follow.FollowMember;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class GameController {

    private final GameService gameService;
    private final FollowGameService followGameService;

    @PostMapping("/games")
    public ResponseEntity<GameDto.Response> createGame(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestBody GameDto.Post postDto) {
        return new ResponseEntity<>(gameService.createGame(memberPrincipal, postDto), HttpStatus.CREATED);
    }

    @PatchMapping("/games/{game-id}")
    public ResponseEntity<GameDto.Response> modifyGame(@PathVariable("game-id") long gameId,
                                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestBody GameDto.Patch patchDto) {
        return new ResponseEntity<>(gameService.modifyGame(gameId, memberPrincipal, patchDto), HttpStatus.OK);
    }

    @GetMapping("/games")
    public ResponseEntity<Page<GameDto.Response>> getAllGames(@PageableDefault(page = 0, size = 30) Pageable pageable) {
        return new ResponseEntity<>(gameService.getAllGames(pageable), HttpStatus.OK);
    }

    @GetMapping("/games/popular")
    public ResponseEntity<Page<GameDto.Response>> getPopularGames(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        return new ResponseEntity<>(gameService.getPopularGames(pageable), HttpStatus.OK);
    }

    @GetMapping("/games/new")
    public ResponseEntity<Page<GameDto.Response>> getNewGames(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        return new ResponseEntity<>(gameService.getNewGames(pageable), HttpStatus.OK);
    }

    @PostMapping("/games/{game_id}/follow")
    public ResponseEntity<FollowMember> followMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                     @PathVariable("game_id") Long gameId) {
        gameService.followGame(gameId, memberPrincipal);
        return ResponseEntity.created(UriCreator.createURI(gameId)).build();
    }

    @DeleteMapping("/games/{game_id}/unfollow")
    public ResponseEntity<FollowMember> unfollowMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @PathVariable("game_id") Long gameId) {
        gameService.unfollowGame(gameId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/games/{game_id}/follower")
    public ResponseEntity<SingleResponse<List<MemberDto.MemberSimpleInfoResponse>>> getGameFollowers(@PathVariable("game_id") Long gameId) {
        List<Member> followers = followGameService.getAllFollowerByMemberId(gameId);
        return ResponseEntity.ok(new SingleResponse<>(MemberDto.getMemberSimpleInfoResponses(followers)));
    }
}
