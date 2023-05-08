package codejejus.inddybuddy.file;

import codejejus.inddybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
        FileDto memberFileDto = new FileDto(fileName, fileUrl, member);
        File file = fileMapper.memberFileDtoToEntity(memberFileDto);
        return fileRepository.save(file);
    }

    public void deleteMemberImg(Member member) {
        File file = fileRepository.findByMember(member);
        amazonS3Service.deleteFile(file.getFileName());
    }

}
