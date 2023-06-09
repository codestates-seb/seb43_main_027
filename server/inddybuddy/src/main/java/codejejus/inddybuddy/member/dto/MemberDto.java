package codejejus.inddybuddy.member.dto;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.message.MessageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {

    @AllArgsConstructor
    @Getter
    public static class Post {

        @Email
        @NotBlank
        private String email;
        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        @NotBlank
        private String username;
    }

    @AllArgsConstructor
    @Getter
    public static class Patch {

        private Long memberId;
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        private String username;
        private String aboutMe;
        private Member.MemberStatus memberStatus;

        public void addMemberId(Long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    public static class BaseResponse {

        private final Long memberId;
        private final String email;
        private final String userName;
        private final Member.MemberStatus memberStatus;
        private final String imageUrl;

        public BaseResponse(Member member) {
            this.memberId = member.getMemberId();
            this.email = member.getEmail();
            this.userName = member.getUsername();
            this.memberStatus = member.getMemberStatus();
            this.imageUrl = member.getImageUrl();
        }
    }

    @Getter
    public static class Response extends BaseResponse {

        private final String aboutMe;
        private final LocalDateTime createdAt;
        private final LocalDateTime updatedAt;

        public Response(Member member) {
            super(member);
            this.aboutMe = member.getAboutMe();
            this.createdAt = member.getCreatedAt();
            this.updatedAt = member.getUpdatedAt();
        }
    }

    @Getter
    public static class ProfileResponse extends Response {

        private final Long followerCount;
        private final Long followingCount;

        public ProfileResponse(Member member) {
            super(member);
            this.followerCount = member.getFollowerCount();
            this.followingCount = member.getFollowingCount();
        }
    }

    @Getter
    public static class SimpleInfoResponse extends BaseResponse {

        private final Long followerCount;
        private final Long followingCount;

        public SimpleInfoResponse(Member member) {
            super(member);
            this.followerCount = member.getFollowerCount();
            this.followingCount = member.getFollowingCount();
        }
    }

    @AllArgsConstructor
    @Getter
    public static class MessageResponse {

        private BaseResponse sender;
        private BaseResponse receiver;

        public MessageResponse(MessageDto.MemberResponse memberResponse) {
            this.sender = new BaseResponse(memberResponse.getSender());
            this.receiver = new BaseResponse(memberResponse.getReceiver());
        }
    }

    @AllArgsConstructor
    @Getter
    public static class FollowingResponse {

        private List<SimpleInfoResponse> followings;
    }

    @AllArgsConstructor
    @Getter
    public static class FollowResponse {

        private List<SimpleInfoResponse> followers;
    }
}
