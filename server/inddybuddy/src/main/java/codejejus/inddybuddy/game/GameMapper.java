package codejejus.inddybuddy.game;

import codejejus.inddybuddy.relation.gamecategory.GameCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class GameMapper {

    private final GameCategoryService gameCategoryService;

    public Game requestToEntity(GameDto.Request requestDto) {
        return Game.builder()
                .gameName(requestDto.getGameName())
                .downloadUrl(requestDto.getDownloadUrl())
                .build();
    }

    public GameDto.Response entityToResponse(Game game) {
        return GameDto.Response.builder()
                .gameId(game.getGameId())
                .gameName(game.getGameName())
                .mainImgUrl(game.getMainImageUrl())
                .downloadUrl(game.getDownloadUrl())
                .categories(gameCategoryService.findCategoryByGame(game))
                .followerCount(game.getFollowerCount())
                .createdAt(game.getCreatedAt())
                .build();
    }

    public Page<GameDto.Response> entityPageToResponsePage(Page<Game> gamePage) {
        return gamePage.map(this::entityToResponse);
    }
}
