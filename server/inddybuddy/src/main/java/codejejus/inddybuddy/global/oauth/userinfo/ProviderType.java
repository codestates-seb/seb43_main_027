package codejejus.inddybuddy.global.oauth.userinfo;

import lombok.Getter;

public enum ProviderType {

    GOOGLE("google");

    @Getter
    private final String provider;

    ProviderType(String provider) {
        this.provider = provider;
    }
}
