package codejejus.inddybuddy.member.entity;

import codejejus.inddybuddy.file.File;
import codejejus.inddybuddy.global.audit.Timestamped;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
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
    @OneToOne(mappedBy = "member")
    private File file;
    @Column(nullable = false)
    private String imageUrl = "default";
    @Column(columnDefinition = "TEXT")
    private String aboutMe;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus memberStatus = MemberStatus.ACTIVE;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
    private String provider;
    private String providerId;

    public Member(String email, String password, String username, String imageUrl, List<String> roles, String provider, String providerId) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.imageUrl = imageUrl;
        this.roles = roles;
        this.provider = provider;
        this.providerId = providerId;
    }

    public void updateMemberStatus(MemberStatus memberStatus) {
        this.memberStatus = memberStatus;
    }

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
