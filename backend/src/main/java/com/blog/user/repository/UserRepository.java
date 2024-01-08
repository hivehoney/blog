package com.blog.user.repository;

import com.blog.user.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUserId(String userId);
}
