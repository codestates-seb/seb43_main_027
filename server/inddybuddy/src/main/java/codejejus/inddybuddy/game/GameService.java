package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.category.CategoryRepository;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class GameService {
    private final GameRepository gameRepository;
    private final CategoryRepository categoryRepository;
    private final GameMapper gameMapper;

    public GameDto.Response createGame(MemberPrincipal memberPrincipal, GameDto.Post postDto) {
        postDto.setMember(memberPrincipal.getMember());
        Game game = gameMapper.postToEntity(postDto);
        postDto.getCategories().stream()
                .map(category -> categoryRepository.findByCategoryName(category.getCategoryName()))
                .forEach(game::addCategory);

        Game save = gameRepository.save(game);

        return gameMapper.entityToResponse(save);
    }

    public GameDto.Response modifyGame(long gameId, MemberPrincipal memberPrincipal, GameDto.Patch patchDto) {
        Game findGame = findVerifidGame(gameId);
        // TODO: 로그인 유저와 게임을 등록한 사람이 일치하는지 확인
        findGame.updateGame(patchDto.getGameName(), patchDto.getDownloadUrl(), patchDto.getMainImgUrl(), patchDto.getCategories());
        return gameMapper.entityToResponse(findGame);
    }

    private Game findVerifidGame(long gameId) {
        Optional<Game> optionalGame = gameRepository.findById(gameId);
        Game findGame =
                optionalGame.orElseThrow(() -> new CustomException(ExceptionCode.GAME_NOT_FOUND));
        return findGame;
    }

    public Page<GameDto.Response> getAllGames(Pageable pageable) {
        Page<Game> allGames = gameRepository.findAll(pageable);
        return gameMapper.entityListToResponseList(allGames);
    }

    public Page<GameDto.Response> getPopularGames(Pageable pageable) {
        Page<Game> popularGames = gameRepository.findAllByOrderByFollowersDesc(pageable);
        return gameMapper.entityListToResponseList(popularGames);
    }

    public Page<GameDto.Response> getNewGames(Pageable pageable) {
        Page<Game> newGames = gameRepository.findAllByOrderByCreatedAtDesc(pageable);
        return gameMapper.entityListToResponseList(newGames);
    }
}
