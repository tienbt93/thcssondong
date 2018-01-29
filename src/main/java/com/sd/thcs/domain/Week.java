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
 * A Week.
 */
@Entity
@Table(name = "week")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Week implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "week_name", nullable = false)
    private String weekName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "is_active", nullable = false)
    private Active isActive;

    @ManyToOne
    private Semester semester;

    @OneToMany(mappedBy = "week")
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

    public String getWeekName() {
        return weekName;
    }

    public Week weekName(String weekName) {
        this.weekName = weekName;
        return this;
    }

    public void setWeekName(String weekName) {
        this.weekName = weekName;
    }

    public Active getIsActive() {
        return isActive;
    }

    public Week isActive(Active isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public Semester getSemester() {
        return semester;
    }

    public Week semester(Semester semester) {
        this.semester = semester;
        return this;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Week lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Week addLesson(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.setWeek(this);
        return this;
    }

    public Week removeLesson(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.setWeek(null);
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
        Week week = (Week) o;
        if (week.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), week.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Week{" +
            "id=" + getId() +
            ", weekName='" + getWeekName() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
