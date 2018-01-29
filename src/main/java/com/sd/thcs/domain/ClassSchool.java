package com.sd.thcs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.sd.thcs.domain.enumeration.Active;

/**
 * A ClassSchool.
 */
@Entity
@Table(name = "class_school")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClassSchool implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "class_name", nullable = false)
    private String className;

    @Column(name = "description")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "is_active", nullable = false)
    private Active isActive;

    @OneToMany(mappedBy = "classSchool")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lesson> lessons = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public ClassSchool className(String className) {
        this.className = className;
        return this;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getDescription() {
        return description;
    }

    public ClassSchool description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Active getIsActive() {
        return isActive;
    }

    public ClassSchool isActive(Active isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public ClassSchool lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public ClassSchool addLesson(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.setClassSchool(this);
        return this;
    }

    public ClassSchool removeLesson(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.setClassSchool(null);
        return this;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ClassSchool classSchool = (ClassSchool) o;
        if (classSchool.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classSchool.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClassSchool{" +
            "id=" + getId() +
            ", className='" + getClassName() + "'" +
            ", description='" + getDescription() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
