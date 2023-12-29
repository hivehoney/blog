package com.blog.common.interceptor;

import com.blog.common.exception.CommonErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        String exception = (String)request.getAttribute("exception");

        if(exception == null) {
            response.sendError(CommonErrorCode.MEMBER_NOT_FOUND.getCode(), CommonErrorCode.MEMBER_NOT_FOUND.getMessage());
        }
        //잘못된 타입의 토큰인 경우
        else if(exception.equals(CommonErrorCode.INVALID_TYPE_ERROR.getCode())) {
            response.sendError(CommonErrorCode.INVALID_TYPE_ERROR.getCode(), CommonErrorCode.INVALID_TYPE_ERROR.getMessage());
        }
        //토큰 만료된 경우
        else if(exception.equals(CommonErrorCode.REFRESH_TOKEN_EXPIRED.getCode())) {
            response.sendError(CommonErrorCode.REFRESH_TOKEN_EXPIRED.getCode(), CommonErrorCode.REFRESH_TOKEN_EXPIRED.getMessage());
        }
        //지원되지 않는 토큰인 경우
        else if(exception.equals(CommonErrorCode.INVALID_ACCESS_TOKEN.getCode())) {
            response.sendError(CommonErrorCode.INVALID_ACCESS_TOKEN.getCode(), CommonErrorCode.INVALID_ACCESS_TOKEN.getMessage());
        }
        else {
            response.sendError(CommonErrorCode.LOGIN_FAIL.getCode(), CommonErrorCode.LOGIN_FAIL.getMessage());
        }
    }
}
