package codejejus.inddybuddy.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageInfo {

    private int page;
    private int size;
    private long totalSize;
    private int totalPage;
}
