package codejejus.inddybuddy.game;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GameService {
    private final GameRepository gameRepository;
    private final GameMapper gameMapper;
    public GameDto.Response createGame(GameDto.Base postDto) {
        Game game = gameMapper.baseToEntity(postDto);
        gameRepository.save(game);
        return gameMapper.entityToResponse(game);
    }
}
