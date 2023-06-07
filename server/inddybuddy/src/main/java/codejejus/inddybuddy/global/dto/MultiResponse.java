package codejejus.inddybuddy.global.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponse<T> {

    private final List<T> data;
    private final PageInfo pageInfo;

    public MultiResponse(List<T> data, Page<T> page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
