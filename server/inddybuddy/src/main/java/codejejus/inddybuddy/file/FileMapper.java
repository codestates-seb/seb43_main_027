package codejejus.inddybuddy.file;

import org.springframework.stereotype.Component;

@Component
public class FileMapper {
    public File memberFileDtoToEntity(FileDto fileDto) {
        return File.builder()
                .fileName(fileDto.getFileName())
                .fileUrl(fileDto.getFileUrl())
                .member(fileDto.getMember())
                .game(fileDto.getGame())
                .post(fileDto.getPost())
                .build();
    }
}
