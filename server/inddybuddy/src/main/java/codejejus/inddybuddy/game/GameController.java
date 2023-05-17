package codejejus.inddybuddy.game;

import codejejus.inddybuddy.follow.FollowGameService;
import codejejus.inddybuddy.follow.FollowMember;
import codejejus.inddybuddy.global.dto.MultiResponse;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.MemberMapper;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.post.PostDto;
import codejejus.inddybuddy.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;
    private final MemberMapper memberMapper;
    private final FollowGameService followGameService;
    private final PostService postService;

    @PostMapping
    public ResponseEntity<GameDto.Response> createGame(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestPart GameDto.Request post,
                                                       @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        GameDto.Response gameResponse = gameService.createGame(memberPrincipal, post, multipartFile);
        return ResponseEntity.created(UriCreator.createURI(gameResponse.getGameId())).build();
    }

    @PatchMapping("/{game-id}")
    public ResponseEntity<SingleResponse<GameDto.Response>> modifyGame(@PathVariable("game-id") Long gameId,
                                                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                       @RequestPart GameDto.Request patch,
                                                                       @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        return ResponseEntity.ok(new SingleResponse<>(gameService.modifyGame(gameId, memberPrincipal, patch, multipartFile)));
    }

    @GetMapping("/search")
    public ResponseEntity<MultiResponse<GameDto.Response>> getAllGames(@PageableDefault(page = 1, size = 30) Pageable pageable,
                                                                       @RequestParam(required = false) String filter,
                                                                       @RequestParam(required = false) String keyword) {
        Page<GameDto.Response> pageGames = gameService.getAllGames(pageable, filter, keyword);
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
    public ResponseEntity<SingleResponse<List<MemberDto.SimpleInfoResponse>>> getGameFollowers(@PathVariable("game_id") Long gameId) {
        List<Member> followers = followGameService.getAllFollowerByMemberId(gameId);
        return ResponseEntity.ok(new SingleResponse<>(memberMapper.getMemberSimpleInfoResponses(followers)));
    }

    @PostMapping("{game-id}/posts")
    public ResponseEntity<PostDto.Response> createPost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestPart PostDto.Request post,
                                                       @PathVariable("game-id") Long gameId,
                                                       @RequestPart(value = "files", required = false) List<MultipartFile> multipartFiles) {
        post.addGameId(gameId);
        PostDto.Response PostResponse = postService.createPost(memberPrincipal, post, multipartFiles);
        URI uri = UriCreator.createURI(PostResponse.getPostId());

        return ResponseEntity.created(uri).build();
    }
}
