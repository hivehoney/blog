package com.blog.user.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Auth {

    @Getter
    public static class LoginDto {
        private String userId;
        private String password;

        @Builder
        @JsonCreator
        public LoginDto(@JsonProperty("userId") String userId, @JsonProperty("password") String password) {
            this.userId = userId;
            this.password = password;
        }
    }

    @NoArgsConstructor
    @Getter
    public static class SignupDto {
        private String userId;
        private String password;

        @Builder
        @JsonCreator
        public SignupDto(@JsonProperty("userId") String userId, @JsonProperty("password") String password) {
            this.userId = userId;
            this.password = password;
        }

        public SignupDto encodePassword(String encodedPassword) {
            this.password = encodedPassword;
            return this;
        }
    }

    @Getter
    public static class TokenDto {
        private String accessToken;
        private String refreshToken;

        public TokenDto(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }
}
