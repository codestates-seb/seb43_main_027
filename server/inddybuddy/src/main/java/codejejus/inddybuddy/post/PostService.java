package codejejus.inddybuddy.post;

import codejejus.inddybuddy.game.GameService;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final MemberService memberService;
    private final GameService gameService;
    private final PostMapper postMapper;

    // 멤버 서비스에서 멤버프린시펄로 받아온 값
    // 포스트할 때 멤버 아이디 들어오는데 정보

    public PostDto.Response createPost(MemberPrincipal memberPrincipal, PostDto.Request requestDto) {  // 단순한 생성 방식
        Post post = postMapper.requestToEntity(requestDto);
        // 게임 선택, 멤버 검증
        post.setGame(gameService.findGame(requestDto.getGameId()));
        post.setMember(memberPrincipal.getMember());
        Post save = postRepository.save(post);
        return postMapper.entityToReesponse(save);
    }
//    public Post createPost2(Post post) {  // 단순한 생성 방식
//        verifyPost(post);
//
//        return postRepository.save(post);
//    }

    private void verifyPost(Post post) {
        Long memberId = post.getMember().getMemberId();
        memberService.findMember(memberId);
    }

}
