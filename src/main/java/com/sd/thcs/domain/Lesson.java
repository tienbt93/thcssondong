package com.sd.thcs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.sd.thcs.domain.enumeration.OrdinalNumber;

import com.sd.thcs.domain.enumeration.Active;

/**
 * A Lesson.
 */
@Entity
@Table(name = "lesson")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "ordinal_number", nullable = false)
    private OrdinalNumber ordinalNumber;

    @Column(name = "lesson_title")
    private String lessonTitle;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "is_active", nullable = false)
    private Active isActive;

    @ManyToOne
    private Teacher teacher;

    @ManyToOne
    private Week week;

    @ManyToOne
    private Subject subject;

    @ManyToOne
    private Room room;

    @ManyToOne
    private ClassSchool classSchool;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Lesson date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public OrdinalNumber getOrdinalNumber() {
        return ordinalNumber;
    }

    public Lesson ordinalNumber(OrdinalNumber ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
        return this;
    }

    public void setOrdinalNumber(OrdinalNumber ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public String getLessonTitle() {
        return lessonTitle;
    }

    public Lesson lessonTitle(String lessonTitle) {
        this.lessonTitle = lessonTitle;
        return this;
    }

    public void setLessonTitle(String lessonTitle) {
        this.lessonTitle = lessonTitle;
    }

    public Active getIsActive() {
        return isActive;
    }

    public Lesson isActive(Active isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Lesson teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Week getWeek() {
        return week;
    }

    public Lesson week(Week week) {
        this.week = week;
        return this;
    }

    public void setWeek(Week week) {
        this.week = week;
    }

    public Subject getSubject() {
        return subject;
    }

    public Lesson subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Room getRoom() {
        return room;
    }

    public Lesson room(Room room) {
        this.room = room;
        return this;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public ClassSchool getClassSchool() {
        return classSchool;
    }

    public Lesson classSchool(ClassSchool classSchool) {
        this.classSchool = classSchool;
        return this;
    }

    public void setClassSchool(ClassSchool classSchool) {
        this.classSchool = classSchool;
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
        Lesson lesson = (Lesson) o;
        if (lesson.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lesson.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lesson{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", ordinalNumber='" + getOrdinalNumber() + "'" +
            ", lessonTitle='" + getLessonTitle() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
