package com.blog.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequestInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.WebRequestHandlerInterceptorAdapter;

import java.text.SimpleDateFormat;

@Log4j2
@Component
public class CommonInterceptor extends WebRequestHandlerInterceptorAdapter {

    /**
     * Create a new WebRequestHandlerInterceptorAdapter for the given WebRequestInterceptor.
     *
     * @param requestInterceptor the WebRequestInterceptor to wrap
     */
    public CommonInterceptor(WebRequestInterceptor requestInterceptor) {
        super(requestInterceptor);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        log.info("===================       START       ===================");
        log.info(" Request URI \t:  " + request.getRequestURI());

        //시간을 가져온다
        long currentTime = System.currentTimeMillis();
        request.setAttribute("sTime", currentTime);
        log.info("요청시간: {}", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(currentTime));


        // TODO Auto-generated method stub
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

        long currentTime = System.currentTimeMillis();
        long startTime = (long)request.getAttribute("sTime");
        long processedTime = currentTime - startTime;

        log.info("response status: {}", response.getStatus());
        log.info("응답시간: {}", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(currentTime));
        log.info("소모시간: {}", processedTime);
        log.info("===================        END        ===================\n");

        // TODO Auto-generated method stub
        super.postHandle(request, response, handler, modelAndView);
    }
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        super.afterCompletion(request, response, handler, ex);
    }
}
