package codejejus.inddybuddy.game;

import org.springframework.stereotype.Component;

@Component
public class GameMapper {

    public Game baseToEntity(GameDto.Base baseDto) {
        return Game.builder()
                .gameName(baseDto.getGameName())
                .mainImgUrl(baseDto.getMainImgUrl())
                .downloadUrl(baseDto.getDownloadUrl())
                .member(baseDto.getMember())
                .categories(baseDto.getCategories())
                .build();
    }

    public GameDto.Response entityToResponse(Game game) {
        return GameDto.Response.builder()
                .gameId(game.getGameId())
                .gameName(game.getGameName())
                .mainImgUrl(game.getMainImgUrl())
                .downloadUrl(game.getDownloadUrl())
                .categories(game.getCategories())
                .build();
    }
}
