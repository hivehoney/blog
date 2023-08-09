package com.blog.common.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;


@Configuration
@EnableJpaRepositories(basePackages = {"com.blog"},
        entityManagerFactoryRef = "baseEntityManager", transactionManagerRef = "baseTransactionManager")
@PropertySource("classpath:/application.properties")
public class DataSourceConfig {

    private final Environment env;

    @Autowired
    public DataSourceConfig(Environment env) {
        this.env = env;
    }

    // 기본 데이터 소스 설정
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSourceProperties baseDataSourceProperties() {
        return new DataSourceProperties();
    }

    // HikariCP 데이터 소스 빈 설정
    @Bean
    public DataSource primeDataSource() {
        return baseDataSourceProperties()
                .initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .build();
    }

    // Entity Manager 팩토리 빈 설정
    @Bean
    public LocalContainerEntityManagerFactoryBean baseEntityManager(EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(primeDataSource())
                .packages("com.blog")
                .persistenceUnit("baseEntityManager")
                .properties(getJpaProperties())
                .build();
    }

    // 트랜잭션 매니저 빈 설정
    @Bean
    public PlatformTransactionManager baseTransactionManager(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(baseEntityManager(builder).getObject());
    }

    // JPA 설정
    private Map<String, Object> getJpaProperties() {
        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", env.getProperty("spring.jpa.hibernate.ddl-auto"));
        properties.put("hibernate.dialect", env.getProperty("spring.jpa.properties.hibernate.dialect"));
        properties.put("hibernate.format_sql", env.getProperty("spring.jpa.properties.hibernate.format_sql"));
        properties.put("hibernate.show_sql", env.getProperty("spring.jpa.properties.hibernate.show_sql"));
        return properties;
    }
}
