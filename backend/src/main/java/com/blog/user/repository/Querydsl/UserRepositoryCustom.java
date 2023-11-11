package com.blog.user.repository.Querydsl;

import com.blog.user.model.response.UserResponse;

public interface UserRepositoryCustom {
    UserResponse searchByCode(String id);

}