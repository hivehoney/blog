package com.blog.common.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "파라미터 값을 확인해주세요."),
    INVALID_FILE_EXTENSION(HttpStatus.BAD_REQUEST, "업로드한 파일의 확장자가 올바르지 않습니다"),
    LOGIN_FAIL(HttpStatus.UNAUTHORIZED, "로그인에 실패했습니다"),
    REFRESH_TOKEN_EXPIRED(HttpStatus.FORBIDDEN, "리프레시 토큰이 만료되었습니다"),
    INVALID_ACCESS_TOKEN(HttpStatus.FORBIDDEN, "유효하지 않은 엑세스 토큰입니다"),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND,"유저 정보를 찾을 수 없습니다"),
    DUPLICATED_EMAIL_ADDRESS(HttpStatus.CONFLICT,"이미 가입된 이메일 주소입니다"),
    FILE_UPLOAD_FAIL(HttpStatus.INTERNAL_SERVER_ERROR,"파일 업로드에 실패했습니다");

    private final HttpStatus status;
    private final String message;
}
