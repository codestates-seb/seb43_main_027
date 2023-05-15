package codejejus.inddybuddy.game;

import codejejus.inddybuddy.category.Category;
import codejejus.inddybuddy.category.CategoryService;
import codejejus.inddybuddy.file.File;
import codejejus.inddybuddy.file.FileService;
import codejejus.inddybuddy.follow.FollowGameService;
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
        Game game = gameMapper.requestToEntity(requestDto);
        List<Category> categories = categoryService.getCategoriesByName(requestDto.getCategoryNames());
        game.setCategories(categories);
        game.setMember(memberPrincipal.getMember());
        if (multipartFile != null) {
            File memberImg = fileService.createFile(multipartFile, game);
            game.setMainImageUrl(memberImg.getFileUrl());
        }
        // TODO : 중복된 이름 게임 예외 처리
        Game save = gameRepository.save(game);
        return gameMapper.entityToResponse(save);
    }

    public GameDto.Response modifyGame(Long gameId, MemberPrincipal memberPrincipal, GameDto.Request requestDto, MultipartFile multipartFile) {
        Game findGame = findVerifidGame(gameId);
        memberService.verifySameMember(findGame.getMember(), memberPrincipal.getMember());
        List<Category> patchCategories = categoryService.getCategoriesByName(requestDto.getCategoryNames());
        if (multipartFile != null) {
            // TODO : 미리 등록한 이미지 S3에서 삭제
            // fileService.deleteMemberImg(findMember);
            File memberImg = fileService.createFile(multipartFile, findGame);
            findGame.setMainImageUrl(memberImg.getFileUrl());
        }
        findGame.updateGame(requestDto.getGameName(), requestDto.getDownloadUrl(), patchCategories);
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

    public Game findGame(Long gameId) {
        return findVerifidGame(gameId);
    }

    public Page<GameDto.Response> getAllGames(Pageable pageable, String filter) {
        Page<Game> games = gameRepository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Filter.getMatchedSort(filter)));
        return gameMapper.entityPageToResponsePage(games);
    }

    private Game findVerifidGame(Long gameId) {
        Optional<Game> optionalGame = gameRepository.findById(gameId);
        return optionalGame.orElseThrow(() -> new CustomException(ExceptionCode.GAME_NOT_FOUND));
    }
}
