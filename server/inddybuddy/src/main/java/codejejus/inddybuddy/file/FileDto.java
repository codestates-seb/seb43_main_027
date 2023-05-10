package codejejus.inddybuddy.file;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Getter;

@Getter
public class FileDto {
    private String fileName;
    private String fileUrl;
    private Member member;
    private Game game;
    private Post post;

    public FileDto(String fileName, String fileUrl, Member member, Game game, Post post) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.member = member;
        this.game = game;
        this.post = post;
    }
}
