package com.blog.user.service;

import com.blog.common.exception.DuplicateMemberException;
import com.blog.user.domain.User;
import com.blog.user.model.UserDetailsImpl;
import com.blog.user.model.request.UserRequest;
import com.blog.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final Logger logger = LogManager.getLogger(UserDetailsServiceImpl.class);

    private final UserRepository userRepository;

    public UserDetailsImpl loadUserByUsername(String userId) throws UsernameNotFoundException {
        User findUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Can't find user with this id. -> " + userId));

        if(findUser != null){
            UserDetailsImpl userDetails  = new UserDetailsImpl(findUser);
            return userDetails;
        }

        return null;
    }
}
