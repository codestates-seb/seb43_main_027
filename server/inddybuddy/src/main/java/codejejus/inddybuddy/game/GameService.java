package codejejus.inddybuddy.game;

import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GameService {
    private final GameRepository gameRepository;
    private final GameMapper gameMapper;
    public GameDto.Response createGame(MemberPrincipal memberPrincipal, GameDto.Base baseDto) {
        baseDto.setMember(memberPrincipal.getMember());
        Game game = gameMapper.baseToEntity(baseDto);
        gameRepository.save(game);
        return gameMapper.entityToResponse(game);
    }
}
