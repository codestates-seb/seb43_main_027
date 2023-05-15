package codejejus.inddybuddy.file;

import codejejus.inddybuddy.global.constant.Constants;
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

    public File createFile(MultipartFile multipartFile, Object object) {
        String fileName = amazonS3Service.saveUploadFile(multipartFile);
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
        if (!file.getFileUrl().equals(Constants.MEMBER_DEFAULT_IMG)) {
            amazonS3Service.deleteFile(file.getFileName());
            fileRepository.delete(file);
        }
    }

    public void deletePostFiles(Post post) {
        List<File> files = fileRepository.findByPost(post);
        files.forEach(file -> {
            amazonS3Service.deleteFile(file.getFileName());
            fileRepository.delete(file);
        });
    }
}
