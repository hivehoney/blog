package com.blog.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, 400,"파라미터 값을 확인해주세요."),
    INVALID_FILE_EXTENSION(HttpStatus.BAD_REQUEST, 400, "업로드한 파일의 확장자가 올바르지 않습니다"),
    LOGIN_FAIL(HttpStatus.UNAUTHORIZED, 400,"로그인에 실패했습니다"),
    REFRESH_TOKEN_EXPIRED(HttpStatus.FORBIDDEN, 400, "리프레시 토큰이 만료되었습니다"),
    INVALID_ACCESS_TOKEN(HttpStatus.FORBIDDEN, 400, "유효하지 않은 엑세스 토큰입니다"),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, 400,"유저 정보를 찾을 수 없습니다"),
    DUPLICATED_EMAIL_ADDRESS(HttpStatus.CONFLICT, 400,"이미 가입된 이메일 주소입니다"),
    FILE_UPLOAD_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, 400,"파일 업로드에 실패했습니다"),

    INVALID_FORMAT_ERROR(HttpStatus.BAD_REQUEST,400, "올바르지 않은 포맷입니다."),
    INVALID_TYPE_ERROR(HttpStatus.BAD_REQUEST, 400, "올바르지 않은 타입입니다."),
    ILLEGAL_ARGUMENT_ERROR(HttpStatus.BAD_REQUEST, 400, "필수 파라미터가 없습니다"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."),
            ;


    private final HttpStatus httpStatus;
    private final int code;
    private final String message;
}
