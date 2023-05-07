package codejejus.inddybuddy.game;

import codejejus.inddybuddy.global.dto.MultiResponse;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
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
@RequestMapping("/api")
public class GameController {
    private final GameService gameService;

    @PostMapping("/games")
    public ResponseEntity<GameDto.Response> createGame(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestBody GameDto.Post postDto) {
        GameDto.Response gameResponse = gameService.createGame(memberPrincipal, postDto);
        return ResponseEntity.created(UriCreator.createURI(gameResponse.getGameId())).build();
    }

    @PatchMapping("/games/{game-id}")
    public ResponseEntity<SingleResponse<GameDto.Response>> modifyGame(@PathVariable("game-id") long gameId,
                                                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                       @RequestBody GameDto.Patch patchDto) {
        return ResponseEntity.ok(new SingleResponse<>(gameService.modifyGame(gameId, memberPrincipal, patchDto)));
    }

    @GetMapping("/games")
    public ResponseEntity<MultiResponse<GameDto.Response>> getAllGames(@PageableDefault(page = 0, size = 30) Pageable pageable) {
        Page<GameDto.Response> pageGames = gameService.getAllGames(pageable);
        List<GameDto.Response> games = pageGames.getContent();
        return ResponseEntity.ok(new MultiResponse<>(games, pageGames));
    }

    @GetMapping("/games/popular")
    public ResponseEntity<MultiResponse<GameDto.Response>> getPopularGames(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        Page<GameDto.Response> pageGames = gameService.getPopularGames(pageable);
        List<GameDto.Response> games = pageGames.getContent();
        return ResponseEntity.ok(new MultiResponse<>(games, pageGames));
    }

    @GetMapping("/games/new")
    public ResponseEntity<MultiResponse<GameDto.Response>> getNewGames(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        Page<GameDto.Response> pageGames = gameService.getNewGames(pageable);
        List<GameDto.Response> games = pageGames.getContent();
        return ResponseEntity.ok(new MultiResponse<>(games, pageGames));
    }
}
