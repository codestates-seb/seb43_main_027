package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.category.CategoryService;
import codejejus.inddybuddy.file.File;
import codejejus.inddybuddy.file.FileService;
import codejejus.inddybuddy.relation.followgame.FollowGameService;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
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
    private final FileService fileService;

    public GameDto.Response createGame(MemberPrincipal memberPrincipal, GameDto.Request requestDto, MultipartFile multipartFile) {
        verifyExistGameName(requestDto.getGameName());
        Game game = gameMapper.requestToEntity(requestDto);
        List<Category> categories = categoryService.getCategoriesByName(requestDto.getCategoryNames());
        game.setCategories(categories);
        game.setMember(memberPrincipal.getMember());
        if (multipartFile != null) {
            File memberImg = fileService.createFile(multipartFile, game);
            game.setMainImageUrl(memberImg.getFileUrl());
        }
        Game save = gameRepository.save(game);
        return gameMapper.entityToResponse(save);
    }

    public GameDto.Response modifyGame(Long gameId, MemberPrincipal memberPrincipal, GameDto.Request requestDto, MultipartFile multipartFile) {
        Game findGame = findVerifidGame(gameId);
        memberService.verifySameMember(findGame.getMember(), memberPrincipal.getMember());
        List<Category> patchCategories = categoryService.getCategoriesByName(requestDto.getCategoryNames());
        if (multipartFile != null) {
            fileService.deleteGameImg(findGame);
            File file = fileService.createFile(multipartFile, findGame);
            findGame.setMainImageUrl(file.getFileUrl());
        }
        findGame.updateGame(requestDto.getGameName(), requestDto.getDownloadUrl(), patchCategories);
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
    public Page<GameDto.Response> getGamesByKeyword(Pageable pageable, String keyword) {
        Page<Game> allByContainingKeyword = getByGameNameContaining(pageable, keyword);
        return gameMapper.entityPageToResponsePage(allByContainingKeyword);
    }

    private Page<Game> getByGameNameContaining(Pageable pageable, String keyword) {
        return gameRepository.findByGameNameContaining(keyword, PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize()));
    }

    private Page<Game> getGames(Pageable pageable, String filter) {
        return gameRepository.findAll(PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Filter.getMatchedSort(filter)));
    }

    private Game findVerifidGame(Long gameId) {
        Optional<Game> optionalGame = gameRepository.findById(gameId);
        return optionalGame.orElseThrow(() -> new CustomException(ExceptionCode.GAME_NOT_FOUND));
    }

    private void verifyExistGameName(String gameName) {
        boolean isExist = gameRepository.existsByGameName(gameName);
        if (isExist) {
            throw new CustomException(ExceptionCode.GAME_NAME_EXIST);
        }
    }
}
