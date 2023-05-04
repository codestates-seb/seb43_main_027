package codejejus.inddybuddy.game;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class GameController {
    private final GameService gameService;

    @PostMapping("/categories/{category_id}/games")
    public ResponseEntity<GameDto.Response> createGame(@PathVariable("category_id") int categoryId,
                                                       @RequestBody GameDto.Base postDto) {
        return new ResponseEntity(gameService.createGame(postDto), HttpStatus.CREATED);
    }

}
