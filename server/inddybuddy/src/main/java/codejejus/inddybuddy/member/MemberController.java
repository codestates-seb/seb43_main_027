package codejejus.inddybuddy.member;

import codejejus.inddybuddy.follow.FollowMember;
import codejejus.inddybuddy.follow.FollowMemberService;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RequestMapping("/api/members")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberMapper memberMapper;
    private final MemberService memberService;
    private final FollowMemberService followMemberService;

    @PostMapping("/signup")
    public ResponseEntity<URI> postMember(@RequestBody MemberDto.Post post) {
        Member member = memberService.createMember(memberMapper.memberDtoPostToMember(post));
        return ResponseEntity.created(UriCreator.createURI(member.getMemberId())).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<SingleResponse<MemberDto.Response>> patchMember(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                          @PathVariable("member-id") Long memberId,
                                                                          @Valid @RequestBody MemberDto.Patch patch) {
        patch.addMemberId(memberId);
        Member member = memberService.updateMember(memberMapper.memberDtoPatchToMember(patch), memberPrincipal);
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
        MemberDto.ProfileResponse response = memberMapper.memberToMemberProfileDtoResponse(
                member,
                followMemberService.getFollowerCount(member),
                followMemberService.getFollowingCount(member)
        );
        return ResponseEntity.ok(new SingleResponse<>(response));
    }

    @GetMapping("/{member-id}/following")
    public ResponseEntity<SingleResponse<List<MemberDto.MemberSimpleInfoResponse>>> getFollowingMember(@PathVariable("member-id") Long memberId) {
        List<Member> followings = followMemberService.getAllFollowingByMemberId(memberId);
        return ResponseEntity.ok(new SingleResponse<>(MemberDto.getMemberSimpleInfoResponses(followings)));
    }

    @GetMapping("/{member-id}/follower")
    public ResponseEntity<SingleResponse<List<MemberDto.MemberSimpleInfoResponse>>> getFollowerMember(@PathVariable("member-id") Long memberId) {
        List<Member> followers = followMemberService.getAllFollowerByMemberId(memberId);
        return ResponseEntity.ok(new SingleResponse<>(MemberDto.getMemberSimpleInfoResponses(followers)));
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
