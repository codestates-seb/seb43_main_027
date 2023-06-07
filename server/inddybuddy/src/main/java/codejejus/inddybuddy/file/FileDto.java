package codejejus.inddybuddy.file;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Getter;

@Getter
public class FileDto {

    private final String fileName;
    private final String fileUrl;
    private Member member;
    private Game game;
    private Post post;

    public FileDto(String fileName, String fileUrl, Object object) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        if (object instanceof Member) this.member = (Member) object;
        if (object instanceof Game) this.game = (Game) object;
        if (object instanceof Post) this.post = (Post) object;
    }
}
