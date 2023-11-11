package com.blog.common.exception;

import lombok.Getter;
import org.springframework.dao.DuplicateKeyException;

@Getter
public class DuplicateMemberException extends DuplicateKeyException {
    public DuplicateMemberException(String msg) {
        super(msg);
    }
}
