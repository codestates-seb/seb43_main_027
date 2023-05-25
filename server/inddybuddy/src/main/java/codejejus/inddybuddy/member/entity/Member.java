package codejejus.inddybuddy.member.entity;

import codejejus.inddybuddy.global.audit.Timestamped;
import codejejus.inddybuddy.global.constant.Constants;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
    @Column(nullable = false)
    private String imageUrl = Constants.MEMBER_DEFAULT_IMG;
    @Column(columnDefinition = "TEXT")
    private String aboutMe;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus memberStatus = MemberStatus.ACTIVE;
    @ElementCollection(fetch = FetchType.EAGER)
    @BatchSize(size = 10)
    private List<String> roles = new ArrayList<>();
    private String provider;
    private String providerId;
    @Formula("(select count(*) from follow_member where follow_member.follower_id = member_id)")
    private Long followerCount;
    @Formula("(select count(*) from follow_member where follow_member.following_id = member_id)")
    private Long followingCount;

    public Member(String email, String password, String username, String imageUrl, List<String> roles, String provider, String providerId) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.imageUrl = imageUrl;
        this.roles = roles;
        this.provider = provider;
        this.providerId = providerId;
    }

    public void deleteMember() {
        this.memberStatus = MemberStatus.DELETE;
        String deletedId = "DEL" + UUID.randomUUID();
        this.username = deletedId;
        this.email = deletedId;
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
