package codejejus.inddybuddy.file;

import codejejus.inddybuddy.game.Game;
import codejejus.inddybuddy.global.constant.Constants;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.post.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private final FileMapper fileMapper;
    private final S3UploadService amazonS3Service;

    public File createFile(MultipartFile multipartFile, Object object) {
        String fileName = amazonS3Service.saveUploadFile(multipartFile);
        log.info("[AWS S3] Save to file S3 complete");
        String fileUrl = amazonS3Service.getFilePath(fileName);
        FileDto fileDto = new FileDto(fileName, fileUrl, object);
        File file = fileMapper.memberFileDtoToEntity(fileDto);
        return fileRepository.save(file);
    }

    public List<File> createFiles(List<MultipartFile> multipartFiles, Post post) {
        return multipartFiles.stream()
                .map(multipartFile -> this.createFile(multipartFile, post))
                .collect(Collectors.toList());
    }

    public void deleteMemberImg(Member member) {
        File file = fileRepository.findByMember(member);
        if (file != null && !file.getFileUrl().equals(Constants.MEMBER_DEFAULT_IMG)) {
            amazonS3Service.deleteFile(file.getFileName());
            log.info("[AWS S3] Delete to file S3 complete");
            fileRepository.delete(file);
        }
    }

    public void deleteGameImg(Game game) {
        File file = fileRepository.findByGame(game);
        if (file != null && !file.getFileUrl().equals(Constants.GAME_DEFAULT_IMG)) {
            amazonS3Service.deleteFile(file.getFileName());
            log.info("[AWS S3] Delete to file S3 complete");
            fileRepository.delete(file);
        }
    }

    public void deletePostFiles(Post post) {
        List<File> files = fileRepository.findByPost(post);
        files.forEach(file -> {
            amazonS3Service.deleteFile(file.getFileName());
            log.info("[AWS S3] Delete to file S3 complete");
            fileRepository.delete(file);
        });
    }

    public void deletePostFilesByPatchFileUrl(Post post, List<File> fileList, List<String> patchFileUrlList) {
        List<String> fileUrlList = fileList.stream()
                .map(File::getFileUrl)
                .collect(Collectors.toList());
        List<String> deleteFileUrlList = fileUrlList.stream()
                .filter(fileUrl -> !patchFileUrlList.contains(fileUrl))
                .collect(Collectors.toList());

        deleteFileUrlList.stream()
                .peek(amazonS3Service::deleteFile)
                .map(fileRepository::findByFileUrl)
                .forEach(file -> {
                    fileRepository.delete(file);
                    post.deleteFile(file);
                });
        log.info("[AWS S3] Delete to file S3 complete");
    }
}
