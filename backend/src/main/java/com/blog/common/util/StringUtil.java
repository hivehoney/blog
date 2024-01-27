package com.blog.common.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Random;

public class StringUtil {
    public static String randomStr(int length) {
        Random random = new Random();
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int choice = random.nextInt(3);
            switch(choice) {
                case 0:
                    str.append((char)(random.nextInt(25)+97));
                    break;
                case 1:
                    str.append((char)(random.nextInt(25) +65));
                    break;
                case 2:
                    str.append((char)(random.nextInt(10) +48));
                    break;
                default:
                    break;
            }
        }
        return str.toString();
    }

    public static boolean usingTernaryOperator(Number num) {
        return num == null || num.intValue() == 0;
    }

    public static LocalDateTime parseDateFormat(String dateString) {
        String DEFAULT_DATE_FORMAT = "yyyy.MM.dd HH:mm";
        return parseDateFormat(dateString, DEFAULT_DATE_FORMAT);
    }

    public static LocalDateTime parseDateFormat(String dateString, String format) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
            return LocalDateTime.parse(dateString, formatter);
        } catch (DateTimeParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
