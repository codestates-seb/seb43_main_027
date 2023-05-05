package codejejus.inddybuddy.game;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class GameMapper {

    public Game postToEntity(GameDto.Post postDto) {
        return Game.builder()
                .gameName(postDto.getGameName())
                .mainImageUrl(postDto.getMainImgUrl())
                .downloadUrl(postDto.getDownloadUrl())
                .member(postDto.getMember())
                .categories(postDto.getCategories())
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

    public Page<GameDto.Response> entityListToResponseList(Page<Game> gamePage) {
        return gamePage.map(this::entityToResponse);
    }
}
