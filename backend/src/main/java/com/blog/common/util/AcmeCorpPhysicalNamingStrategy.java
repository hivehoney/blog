package com.blog.common.util;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.springframework.context.annotation.Configuration;

import java.util.*;

/**
 * An example PhysicalNamingStrategy that implements database object naming standards
 * for our fictitious company Acme Corp.
 * <p>
 * In general Acme Corp prefers underscore-delimited words rather than camel casing.
 * <p>
 * Additionally standards call for the replacement of certain words with abbreviations.
 *
 * @author Steve Ebersole
 * @author Nathan Xu
 */
@Configuration
public class AcmeCorpPhysicalNamingStrategy extends PhysicalNamingStrategyStandardImpl {
    private static final Map<String, String> ABBREVIATIONS;

    static {
        ABBREVIATIONS = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        ABBREVIATIONS.put("account", "acct");
        ABBREVIATIONS.put("number", "num");
    }

    @Override
    public Identifier toPhysicalTableName(Identifier logicalName, JdbcEnvironment jdbcEnvironment) {
        final List<String> parts = splitAndReplace( logicalName.getText());
        return jdbcEnvironment.getIdentifierHelper().toIdentifier(
                StringUtils.join(parts, '_'),
                logicalName.isQuoted()
        );
    }

    @Override
    public Identifier toPhysicalSequenceName(Identifier logicalName, JdbcEnvironment jdbcEnvironment) {
        final List<String> parts = splitAndReplace( logicalName.getText());
        // Acme Corp says all sequences should end with _seq
        if (!"seq".equals(parts.get(parts.size() - 1))) {
            parts.add("seq");
        }
        return jdbcEnvironment.getIdentifierHelper().toIdentifier(
                StringUtils.join(parts, '_'),
                logicalName.isQuoted()
        );
    }

    @Override
    public Identifier toPhysicalColumnName(Identifier logicalName, JdbcEnvironment jdbcEnvironment) {
        final List<String> parts = splitAndReplace( logicalName.getText());
        return jdbcEnvironment.getIdentifierHelper().toIdentifier(
                StringUtils.join(parts, '_'),
                logicalName.isQuoted()
        );
    }

    private List<String> splitAndReplace(String name) {
        return Arrays.stream(StringUtils.splitByCharacterTypeCamelCase(name))
                .filter(StringUtils::isNotBlank)
                .map(p -> ABBREVIATIONS.getOrDefault(p, p).toLowerCase(Locale.ROOT)).toList();
    }
}