package codejejus.inddybuddy.game;

import org.springframework.stereotype.Component;

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
}
