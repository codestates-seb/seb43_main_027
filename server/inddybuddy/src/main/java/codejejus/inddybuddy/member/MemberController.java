package codejejus.inddybuddy.member;

import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequestMapping("/api/members")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberMapper memberMapper;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<URI> postMember(@RequestBody MemberDto.Post post) {
        Member member = memberService.createMember(memberMapper.memberDtoPostToMember(post));
        return ResponseEntity.created(UriCreator.createURI(member.getMemberId())).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<SingleResponse<MemberDto.Response>> patchMember(@PathVariable("member-id") Long memberId,
                                                                          @RequestBody MemberDto.Patch patch) {
        patch.addMemberId(memberId);
        Member member = memberService.updateMember(memberMapper.memberDtoPatchToMember(patch));
        return ResponseEntity.ok(new SingleResponse<>(memberMapper.memberToMemberDtoResponse(member)));
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<SingleResponse<MemberDto.Response>> getMember(@PathVariable("member-id") Long memberId) {
        Member member = memberService.findMember(memberId);
        return ResponseEntity.ok(new SingleResponse<>(memberMapper.memberToMemberDtoResponse(member)));
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity<Member> deleteMember(@PathVariable("member-id") Long memberId) {
        memberService.deleteMember(memberId);
        return ResponseEntity.noContent().build();
    }
}
