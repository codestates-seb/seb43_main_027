package codejejus.inddybuddy.member.entity;

import codejejus.inddybuddy.global.audit.Timestamped;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Member extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(nullable = false, length = 45, unique = true)
    private String email;
    @Column(nullable = false, length = 100)
    private String password;
    @Column(nullable = false, length = 45, unique = true)
    private String username;
    // TODO: S3 연결 후 기본 이미지 URL 설정
    @Column(nullable = false)
    private String imageUrl = "default";
    @Column(columnDefinition = "TEXT")
    private String aboutMe;
    @Column(nullable = false)
    private MemberStatus memberStatus = MemberStatus.ACTIVE;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public enum MemberStatus {

        ACTIVE("활성화"),
        DISABLED("비활성화"),
        DELETE("회원 삭제");

        @Getter
        private final String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}
