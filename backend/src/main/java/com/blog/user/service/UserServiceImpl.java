package com.blog.user.service;

import com.blog.common.exception.DuplicateMemberException;
import com.blog.user.domain.User;
import com.blog.user.model.request.UserRequest;
import com.blog.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    /**
     * 임시 게시물을 생성하고 해당 게시물의 코드를 반환합니다.
     *
     * @param 'boardId' 게시물이 속한 게시판 ID
     * @param 'author'  작성자 이름
     * @return 생성된 게시물의 코드
     */
    @Transactional
    public void registerUser(UserRequest userRequest) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User userInfo = User.builder()
                .userId(userRequest.getUserId())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .name(userRequest.getLastName()+userRequest.getFirstName())
                .email(userRequest.getEmail())
                .role(User.Role.USER)
                .build();

        User user = (User) userRepository.findByUserId(userInfo.getUserId())
                .map(entity -> {
                    throw new DuplicateMemberException(userInfo.getUserId());
                })
                .orElseGet(() -> userRepository.save(userInfo));
    }
}
