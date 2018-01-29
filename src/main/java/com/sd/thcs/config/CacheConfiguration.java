package com.sd.thcs.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.sd.thcs.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.sd.thcs.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.School.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.School.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.School.class.getName() + ".rooms", jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Teacher.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Semester.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Semester.class.getName() + ".weeks", jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Week.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Week.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Subject.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Subject.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Lesson.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Room.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.Room.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.ClassSchool.class.getName(), jcacheConfiguration);
            cm.createCache(com.sd.thcs.domain.ClassSchool.class.getName() + ".lessons", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
