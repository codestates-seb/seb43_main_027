package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.category.CategoryService;
import codejejus.inddybuddy.follow.FollowGameService;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class GameService {
    private final GameRepository gameRepository;
    private final GameMapper gameMapper;
    private final CategoryService categoryService;
    private final MemberService memberService;
    private final FollowGameService followGameService;

    public GameDto.Response createGame(MemberPrincipal memberPrincipal, GameDto.Request requestDto) {
        Game game = gameMapper.requestToEntity(requestDto);
        List<Category> categories = categoryService.getCategoriesByName(requestDto.getCategoryNames());
        game.setCategories(categories);
        game.setMember(memberPrincipal.getMember());
        Game save = gameRepository.save(game);
        return gameMapper.entityToResponse(save);
    }

    public GameDto.Response modifyGame(Long gameId, MemberPrincipal memberPrincipal, GameDto.Request requestDto) {
        Game findGame = findVerifidGame(gameId);
        memberService.verifySameMember(findGame.getMember(), memberPrincipal.getMember());
        List<Category> patchCategories = categoryService.getCategoriesByName(requestDto.getCategoryNames());
        findGame.updateGame(requestDto.getGameName(), requestDto.getDownloadUrl(), requestDto.getMainImgUrl(), patchCategories);
        return gameMapper.entityToResponse(findGame);
    }

    public void followGame(Long gameId, MemberPrincipal memberPrincipal) {
        Game game = findVerifidGame(gameId);
        Member follower = memberPrincipal.getMember();
        followGameService.following(game, follower);
    }

    public void unfollowGame(Long gameId, MemberPrincipal memberPrincipal) {
        Game game = findVerifidGame(gameId);
        Member follower = memberPrincipal.getMember();
        followGameService.unfollowing(game, follower);
    }

    public Page<GameDto.Response> getAllGames(Pageable pageable, Filter filter) {
        Page<Game> games;

        if (filter == null) games = gameRepository.findAll(pageable);
        else if (filter.equals(Filter.POPULAR)) games = gameRepository.findAllByOrderByFollowersDesc(pageable);
        else if (filter.equals(Filter.NEW)) games = gameRepository.findAllByOrderByCreatedAtDesc(pageable);
        else throw new CustomException(ExceptionCode.FILTER_NOT_FOUND);

        return gameMapper.entityPageToResponsePage(games);
    }

    private Game findVerifidGame(Long gameId) {
        Optional<Game> optionalGame = gameRepository.findById(gameId);
        return optionalGame.orElseThrow(() -> new CustomException(ExceptionCode.GAME_NOT_FOUND));
    }
}
