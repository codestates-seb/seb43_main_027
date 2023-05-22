package codejejus.inddybuddy.member;

import codejejus.inddybuddy.bookmark.BookmarkService;
import codejejus.inddybuddy.post.Post;
import codejejus.inddybuddy.relation.followgame.FollowGameService;
import codejejus.inddybuddy.relation.followmember.FollowMember;
import codejejus.inddybuddy.relation.followmember.FollowMemberService;
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
import codejejus.inddybuddy.post.PostDto;
import codejejus.inddybuddy.post.PostService;
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
    private final PostService postService;
    private final BookmarkService bookmarkService;

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

    @GetMapping("/{member-id}/profile")
    public ResponseEntity<SingleResponse<MemberDto.ProfileResponse>> getMemberProfile(@PathVariable("member-id") Long memberId) {
        Member member = memberService.findMember(memberId);
        MemberDto.ProfileResponse response = memberMapper.memberToMemberProfileDtoResponse(member);
        return ResponseEntity.ok(new SingleResponse<>(response));
    }

    @GetMapping("/profile")
    public ResponseEntity<SingleResponse<MemberDto.ProfileResponse>> getMemberProfile(@AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        MemberDto.ProfileResponse response = memberMapper.memberToMemberProfileDtoResponse(memberPrincipal.getMember());
        return ResponseEntity.ok(new SingleResponse<>(response));
    }

    @GetMapping("/{member-id}/mygame")
    public ResponseEntity<SingleResponse<List<GameDto.Response>>> getFollowingGame(@PathVariable("member-id") Long memberId) {
        List<Game> games = followGameService.getAllFollowGame(memberId);
        List<GameDto.Response> responses = games.stream().map(gameMapper::entityToResponse).collect(Collectors.toList());
        return ResponseEntity.ok(new SingleResponse<>(responses));
    }

    @GetMapping("/{member-id}/mypost")
    public ResponseEntity<MultiResponse<PostDto.MyPageResponse>> getMemberPosts(@PathVariable("member-id") Long memberId,
                                                                                @RequestParam(required = false) Post.PostTag postTag,
                                                                                @PageableDefault(page = 1, size = 30) Pageable pageable) {
        Page<PostDto.MyPageResponse> pageResponses = postService.getPostsByMember(memberId, postTag, pageable);
        return ResponseEntity.ok(new MultiResponse<>(pageResponses.getContent(), pageResponses));
    }

    @GetMapping("/{member-id}/bookmark")
    public ResponseEntity<MultiResponse<PostDto.MyPageResponse>> getBookmarkPostsByMember(@PathVariable("member-id") Long memberId,
                                                                                          @RequestParam(required = false) Post.PostTag postTag,
                                                                                          @PageableDefault(page = 1, size = 30) Pageable pageable) {
        Page<PostDto.MyPageResponse> pageResponses = bookmarkService.getBookmarkPostsByMember(memberId, postTag, pageable);
        return ResponseEntity.ok(new MultiResponse<>(pageResponses.getContent(), pageResponses));
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
    public ResponseEntity<SingleResponse<List<MemberDto.SimpleInfoResponse>>> searchMemberByKeyword(@PageableDefault(page = 1, size = 30) Pageable pageable,
                                                                                                    @RequestParam(required = false, value = "q") String keyword) {
        List<Member> members = memberService.findByUsernameContaining(pageable, keyword);
        List<MemberDto.SimpleInfoResponse> responses = memberMapper.pageMemberToSimpleInfoResponses(members);
        return ResponseEntity.ok(new SingleResponse<>(responses));
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
