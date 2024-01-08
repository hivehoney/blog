package com.blog.user.domain;

import com.blog.common.domain.BaseTimeEntity;
import com.blog.user.model.request.UserRequest;
import jakarta.persistence.*;
import lombok.*;


/**
 * 게시물 정보 Entity
 */
@Entity
@Getter
@Table(name = "blogUser")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account extends BaseTimeEntity {

    @Id
    @Column(name = "userId", nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private Role role;

    @Builder
    public Account(String userId, String name, String password, String email, Role role){
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public static Account from(UserRequest request, Role role) {
        return new Account(request.getEmail(),request.getLastName()+request.getFirstName(),
                        request.getPassword(), request.getEmail(), role);
    }

    public Account update(String name){
        this.name = name;

        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

    @Getter
    public enum Role {
        GUEST("ROLE_GUEST", "게스트"),
        USER("ROLE_USER", "사용자");

        private final String key;
        private final String title;

        Role(String key, String title) {
            this.key = key;
            this.title = title;
        }
    }
}
