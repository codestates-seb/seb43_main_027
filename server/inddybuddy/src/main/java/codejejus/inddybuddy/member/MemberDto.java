package codejejus.inddybuddy.member;

import codejejus.inddybuddy.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class MemberDto {

    @AllArgsConstructor
    @Getter
    public static class Post {

        private String email;
        private String password;
        private String username;
    }

    @AllArgsConstructor
    @Getter
    public static class Patch {

        private Long memberId;
        private String email;
        private String password;
        private String username;
        private String imageUrl;
        private String aboutMe;

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
    }
}
