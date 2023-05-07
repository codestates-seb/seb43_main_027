package codejejus.inddybuddy.member.dto;

import codejejus.inddybuddy.member.entity.Member;
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
        private String email;
        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        private String username;
    }

    @AllArgsConstructor
    @Getter
    public static class Patch {

        private Long memberId;
        private String password;
        private String username;
        private String imageUrl;
        private String aboutMe;
        private Member.MemberStatus memberStatus;

        public void addMemberId(Long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {

        private Long memberId;
        private String email;
        private String username;
        private Member.MemberStatus memberStatus;
        private String imageUrl;
        private String aboutMe;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @AllArgsConstructor
    @Getter
    public static class ProfileResponse {
        private Long memberId;
        private String email;
        private String username;
        private Member.MemberStatus memberStatus;
        private String imageUrl;
        private String aboutMe;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private Long followerCount;
        private Long followingCount;
        private List<MemberSimpleInfoResponse> followers;
        private List<MemberSimpleInfoResponse> followings;
    }

    @AllArgsConstructor
    @Getter
    public static class MemberSimpleInfoResponse {

        private Long memberId;
        private String email;
        private String username;
    }
}
