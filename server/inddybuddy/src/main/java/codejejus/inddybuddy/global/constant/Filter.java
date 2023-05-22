package codejejus.inddybuddy.global.constant;

import lombok.Getter;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.Locale;

@Getter
public enum Filter {

    POPULAR("팔로우 많은 순", Sort.by(Sort.Direction.DESC, "followerCount")),
    LIKE("좋아요 많은 순", Sort.by(Sort.Direction.DESC, "likeCount")),
    NEW("최신순", Sort.by(Sort.Direction.DESC, "createdAt")),
    OLD("오래된 순", Sort.by(Sort.Direction.ASC, "createdAt")),
    MOST_VIEWS("조회수 많은 순", Sort.by(Sort.Direction.DESC, "views"));
    private final String name;
    private final Sort sort;

    Filter(String name, Sort sort) {
        this.name = name;
        this.sort = sort;
    }

    public static Sort getMatchedSort(String filter) {
        if (filter == null) return NEW.sort;
        return Arrays.stream(values())
                .filter(filterType -> filterType.name().equals(filter.toUpperCase(Locale.ROOT)))
                .findAny()
                .orElse(NEW)
                .sort;
    }
}