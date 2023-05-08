package codejejus.inddybuddy.game;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;


@Component
public class GameMapper {

    public Game requestToEntity(GameDto.Request requestDto) {
        return Game.builder()
                .gameName(requestDto.getGameName())
                .mainImageUrl(requestDto.getMainImgUrl())
                .downloadUrl(requestDto.getDownloadUrl())
                .build();
    }

    public GameDto.Response entityToResponse(Game game) {
        return GameDto.Response.builder()
                .gameId(game.getGameId())
                .gameName(game.getGameName())
                .mainImgUrl(game.getMainImageUrl())
                .downloadUrl(game.getDownloadUrl())
                .categories(game.getCategories())
                .build();
    }

    public Page<GameDto.Response> entityPageToResponsePage(Page<Game> gamePage) {
        return gamePage.map(this::entityToResponse);
    }
}
