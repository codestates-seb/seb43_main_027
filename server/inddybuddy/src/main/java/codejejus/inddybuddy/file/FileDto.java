package codejejus.inddybuddy.file;

import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.Getter;

@Getter
public class FileDto {
    private String fileName;
    private String fileUrl;
    private Member member;
    private Post post;

    public FileDto(String fileName, String fileUrl, Member member) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.member = member;
    }

    public FileDto(String fileName, String fileUrl, Post post) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.post = post;
    }
}
