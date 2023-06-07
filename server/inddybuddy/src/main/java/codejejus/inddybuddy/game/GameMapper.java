package codejejus.inddybuddy.game;

import codejejus.inddybuddy.relation.gamecategory.GameCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class GameMapper {

    private final GameCategoryService gameCategoryService;

    public Game requestToEntity(GameDto.Request requestDto) {
        return Game.builder()
                .gameName(requestDto.getGameName())
                .downloadUrl(requestDto.getDownloadUrl())
                .description(requestDto.getDescription())
                .build();
    }

    public GameDto.Response entityToResponse(Game game) {
        return GameDto.Response.builder()
                .gameId(game.getGameId())
                .memberId(game.getMember().getMemberId())
                .gameName(game.getGameName())
                .mainImgUrl(game.getMainImageUrl())
                .description(game.getDescription())
                .downloadUrl(game.getDownloadUrl())
                .categories(gameCategoryService.findCategoryByGame(game))
                .followerCount(game.getFollowerCount())
                .createdAt(game.getCreatedAt())
                .build();
    }

    public Page<GameDto.Response> entityPageToResponsePage(Page<Game> gamePage) {
        return gamePage.map(this::entityToResponse);
    }

    public List<GameDto.Response> entityListToResponseList(List<Game> gameList) {
        return gameList.stream().map(this::entityToResponse).collect(Collectors.toList());
    }
}
