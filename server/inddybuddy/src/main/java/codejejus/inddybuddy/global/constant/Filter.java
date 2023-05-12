package codejejus.inddybuddy.global.constant;

public enum Filter {

    POPULAR("팔로우 많은 순"),
    LIKE("좋아요 많은 순"),
    NEW("최신순"),
    MOST_VIEWS("조회수 많은 순");
    private final String name;

    Filter(String name) {
        this.name = name;
    }
}