package codejejus.inddybuddy.global.dto;

import lombok.Getter;

@Getter
public class SingleResponse<T> {

    T data;

    public SingleResponse(T data) {
        this.data = data;
    }
}