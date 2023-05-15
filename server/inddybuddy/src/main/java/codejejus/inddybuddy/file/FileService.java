package codejejus.inddybuddy.file;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private final FileMapper fileMapper;
    private final S3UploadService amazonS3Service;

    public File createMemberImg(MultipartFile multipartFile, Member member) {
        String fileName = amazonS3Service.saveUploadFile(multipartFile);
        String fileUrl = amazonS3Service.getFilePath(fileName);
        FileDto memberFileDto = new FileDto(fileName, fileUrl, member, null, null);
        File file = fileMapper.memberFileDtoToEntity(memberFileDto);
        return fileRepository.save(file);
    }

    public File createGameImg(MultipartFile multipartFile, Game game) {
        String fileName = amazonS3Service.saveUploadFile(multipartFile);
        String fileUrl = amazonS3Service.getFilePath(fileName);
        FileDto memberFileDto = new FileDto(fileName, fileUrl, null, game, null);
        File file = fileMapper.memberFileDtoToEntity(memberFileDto);
        return fileRepository.save(file);
    }

    public List<File> createPostFiles(List<MultipartFile> multipartFiles, Post post) {
        return multipartFiles.stream()
                .map(multipartFile -> {
                    String fileName = amazonS3Service.saveUploadFile(multipartFile);
                    String fileUrl = amazonS3Service.getFilePath(fileName);
                    FileDto postFileDto = new FileDto(fileName, fileUrl, null, null, post);
                    File file = fileMapper.memberFileDtoToEntity(postFileDto);
                    return fileRepository.save(file);
                })
                .collect(Collectors.toList());
    }

    public void deleteMemberImg(Member member) {
        File file = fileRepository.findByMember(member);
        amazonS3Service.deleteFile(file.getFileName());
        fileRepository.delete(file);
    }

    public void deletePostFiles(Post post) {
        List<File> files = fileRepository.findByPost(post);
        files.forEach(file -> {
            amazonS3Service.deleteFile(file.getFileName());
            fileRepository.delete(file);
        });
    }
}
