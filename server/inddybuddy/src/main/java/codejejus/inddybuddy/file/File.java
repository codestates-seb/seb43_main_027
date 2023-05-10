package codejejus.inddybuddy.file;

import codejejus.inddybuddy.game.Game;
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
    @OneToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Builder
    public File(String fileUrl, String fileName, Member member, Game game, Post post) {
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.member = member;
        this.game = game;
        this.post = post;
    }
}
