package com.blog.user.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRequest {

    @ApiModelProperty(notes = "userId")
    private String userId;

    @ApiModelProperty(notes = "성")
    private String lastName;

    @ApiModelProperty(notes = "이름")
    private String firstName;

    @ApiModelProperty(notes = "password")
    private String password;

    @ApiModelProperty(notes = "email")
    private String email;

    @ApiModelProperty(notes = "권한")
    private String role;

    @Builder
    public UserRequest(String userId, String lastName, String firstName, String password,
                       String email, String role) {

        this.userId = userId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.password = password;
        this.email = email;
        this.role = role;
    }
}
