package com.blog.common.type;

import lombok.Getter;

@Getter
public enum CardType {
    MASTER("마스터카드"),
    VISA("비자카드");

    private final String name;

    CardType(String name) {
        this.name = name;
    }
}