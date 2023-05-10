package codejejus.inddybuddy.file;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {

    File findByMember(Member member);
    File findByGame(Game game);
    File findByPost(Post post);
}
