package codejejus.inddybuddy.member;

import codejejus.inddybuddy.follow.FollowGameService;
import codejejus.inddybuddy.follow.FollowMember;
import codejejus.inddybuddy.follow.FollowMemberService;
import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.game.GameDto;
import codejejus.inddybuddy.game.GameMapper;
import codejejus.inddybuddy.global.dto.MultiResponse;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/members")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberMapper memberMapper;
    private final GameMapper gameMapper;
    private final MemberService memberService;
    private final FollowMemberService followMemberService;
    private final FollowGameService followGameService;

    @PostMapping("/signup")
    public ResponseEntity<URI> postMember(@RequestBody MemberDto.Post post) {
        Member member = memberService.createMember(memberMapper.memberDtoPostToMember(post));
        return ResponseEntity.created(UriCreator.createURI(member.getMemberId())).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<SingleResponse<MemberDto.Response>> patchMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                          @PathVariable("member-id") Long memberId,
                                                                          @Valid @RequestPart MemberDto.Patch patch,
                                                                          @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        patch.addMemberId(memberId);
        Member member = memberService.updateMember(memberMapper.memberDtoPatchToMember(patch), memberPrincipal, multipartFile);
        return ResponseEntity.ok(new SingleResponse<>(memberMapper.memberToMemberDtoResponse(member)));
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<SingleResponse<MemberDto.Response>> getMember(@PathVariable("member-id") Long memberId) {
        Member member = memberService.findMember(memberId);
        return ResponseEntity.ok(new SingleResponse<>(memberMapper.memberToMemberDtoResponse(member)));
    }

    @GetMapping("/{member-id}/profile")
    public ResponseEntity<SingleResponse<MemberDto.ProfileResponse>> getMemberProfile(@PathVariable("member-id") Long memberId) {
        Member member = memberService.findMember(memberId);
        MemberDto.ProfileResponse response = memberMapper.memberToMemberProfileDtoResponse(member);
        return ResponseEntity.ok(new SingleResponse<>(response));
    }

    @GetMapping("/{member-id}/mygame")
    public ResponseEntity<SingleResponse<List<GameDto.Response>>> getFollowingGame(@PathVariable("member-id") Long memberId) {
        List<Game> games = followGameService.getAllFollowGame(memberId);
        List<GameDto.Response> responses = games.stream().map(gameMapper::entityToResponse).collect(Collectors.toList());
        return ResponseEntity.ok(new SingleResponse<>(responses));
    }

    @GetMapping("/{member-id}/following")
    public ResponseEntity<SingleResponse<List<MemberDto.SimpleInfoResponse>>> getFollowingMember(@PathVariable("member-id") Long memberId) {
        List<Member> followings = followMemberService.getAllFollowingByMemberId(memberId);
        return ResponseEntity.ok(new SingleResponse<>(memberMapper.getMemberSimpleInfoResponses(followings)));
    }

    @GetMapping("/{member-id}/follower")
    public ResponseEntity<SingleResponse<List<MemberDto.SimpleInfoResponse>>> getFollowerMember(@PathVariable("member-id") Long memberId) {
        List<Member> followers = followMemberService.getAllFollowerByMemberId(memberId);
        return ResponseEntity.ok(new SingleResponse<>(memberMapper.getMemberSimpleInfoResponses(followers)));
    }

    @GetMapping("/search")
    public ResponseEntity<MultiResponse<MemberDto.SimpleInfoResponse>> searchMemberByKeyword(@RequestParam(value = "q") String keyword,
                                                                                             @PageableDefault(page = 1, size = 30) Pageable pageable) {
        Page<Member> page = memberService.findByUsernameContaining(keyword, pageable);
        Page<MemberDto.SimpleInfoResponse> memberPage = memberMapper.pageMemberToSimpleInfoResponses(page);
        return ResponseEntity.ok(new MultiResponse<>(memberPage.getContent(), memberPage));
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity<Member> deleteMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                               @PathVariable("member-id") Long memberId) {
        memberService.deleteMember(memberId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{member-id}/follow")
    public ResponseEntity<FollowMember> followMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                     @PathVariable("member-id") Long memberId) {
        memberService.followMember(memberId, memberPrincipal);
        return ResponseEntity.created(UriCreator.createURI(memberId)).build();
    }

    @DeleteMapping("/{member-id}/unfollow")
    public ResponseEntity<FollowMember> unfollowMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @PathVariable("member-id") Long memberId) {
        memberService.unfollowMember(memberId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }
}
