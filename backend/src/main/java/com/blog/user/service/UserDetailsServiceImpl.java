package com.blog.user.service;

import com.blog.common.domain.UserAccount;
import com.blog.user.domain.Account;
import com.blog.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final Logger logger = LogManager.getLogger(UserDetailsServiceImpl.class);

    private final UserRepository userRepository;

    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Account findUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Can't find user with this id. -> " + userId));

        if(findUser != null) {
            return new UserAccount(findUser);
        }

        return null;
    }
}
