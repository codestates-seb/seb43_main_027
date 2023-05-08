package codejejus.inddybuddy.file;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fileId;
    private String fileUrl;
    @Column(length = 150)
    private String fileName;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "post_id")
    private Post post;
    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public File(String fileUrl, String fileName, Member member) {
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.member = member;
    }

    @Builder
    public File(String fileUrl, String fileName, Post post) {
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.post = post;
    }
}
