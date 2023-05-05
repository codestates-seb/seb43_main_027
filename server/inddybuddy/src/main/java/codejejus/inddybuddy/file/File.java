package codejejus.inddybuddy.file;

import codejejus.inddybuddy.post.Post;
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
    @JoinColumn(name = "post_id")
    private Post post;
}
