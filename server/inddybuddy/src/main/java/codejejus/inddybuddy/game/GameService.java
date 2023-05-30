package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.category.CategoryService;
import codejejus.inddybuddy.file.File;
import codejejus.inddybuddy.file.FileService;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.relation.followgame.FollowGameService;
import codejejus.inddybuddy.relation.gamecategory.GameCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    private final GameCategoryService gameCategoryService;
    private final FileService fileService;

    public GameDto.Response createGame(MemberPrincipal memberPrincipal, GameDto.Request requestDto, MultipartFile multipartFile) {
        verifyExistGameName(requestDto.getGameName());
        Game game = gameMapper.requestToEntity(requestDto);
        game.setMember(memberPrincipal.getMember());
        Optional.ofNullable(multipartFile)
                .ifPresent(findMultiPart -> {
                    File file = fileService.createFile(findMultiPart, game);
                    game.setMainImageUrl(file.getFileUrl());
                });
        Game save = gameRepository.save(game);
        List<Category> categories = categoryService.getCategoriesByName(requestDto.getCategoryNames());
        gameCategoryService.createGameInCategory(game, categories);
        return gameMapper.entityToResponse(save);
    }

    public GameDto.Response modifyGame(Long gameId, MemberPrincipal memberPrincipal, GameDto.Request requestDto, MultipartFile multipartFile) {
        Game findGame = findVerifidGame(gameId);
        memberService.verifySameMember(findGame.getMember(), memberPrincipal.getMember());
        Optional.ofNullable(requestDto.getCategoryNames())
                .ifPresent(categoryNames -> {
                    List<Category> patchCategories = categoryService.getCategoriesByName(categoryNames);
                    gameCategoryService.modifyGameAndCategory(findGame, patchCategories);
                });

        Optional.ofNullable(multipartFile)
                .ifPresent(findMultiPart -> {
                    fileService.deleteGameImg(findGame);
                    File file = fileService.createFile(findMultiPart, findGame);
                    findGame.setMainImageUrl(file.getFileUrl());
                });
        findGame.updateGame(requestDto.getGameName(), requestDto.getDownloadUrl(), requestDto.getDescription());
        return gameMapper.entityToResponse(findGame);
    }

    public GameDto.Response getGame(Long gameId) {
        Game game = findVerifidGame(gameId);
        return gameMapper.entityToResponse(game);
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

    @Transactional(readOnly = true)
    public Game findGame(Long gameId) {
        return findVerifidGame(gameId);
    }

    @Transactional(readOnly = true)
    public Page<GameDto.Response> getAllGames(Pageable pageable, String filter) {
        Page<Game> games = getGames(pageable, filter);
        return gameMapper.entityPageToResponsePage(games);
    }

    @Transactional(readOnly = true)
    public List<GameDto.Response> getAllCreatedGame(Long memberId) {
        Member member = memberService.findMember(memberId);
        List<Game> games = gameRepository.findAllByMember(member);
        return gameMapper.entityListToResponseList(games);
    }

    @Transactional(readOnly = true)
    public Page<GameDto.Response> getGamesByKeyword(Pageable pageable, String keyword) {
        Page<Game> allByContainingKeyword = getByGameNameContaining(pageable, keyword);
        return gameMapper.entityPageToResponsePage(allByContainingKeyword);
    }

    private Page<Game> getByGameNameContaining(Pageable pageable, String keyword) {
        return gameRepository.findByGameNameContaining(PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize()), keyword);
    }

    private Page<Game> getGames(Pageable pageable, String filter) {
        return gameRepository.findAll(PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Filter.getMatchedSort(filter)));
    }

    private Game findVerifidGame(Long gameId) {
        Optional<Game> optionalGame = gameRepository.findById(gameId);
        return optionalGame.orElseThrow(() -> new CustomException(ExceptionCode.GAME_NOT_FOUND));
    }

    private void verifyExistGameName(String gameName) {
        if (gameRepository.existsByGameName(gameName)) {
            throw new CustomException(ExceptionCode.GAME_NAME_EXIST);
        }
    }
}
