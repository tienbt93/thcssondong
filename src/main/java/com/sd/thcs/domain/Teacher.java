package com.sd.thcs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.sd.thcs.domain.enumeration.TrainTitle;

import com.sd.thcs.domain.enumeration.Active;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @NotNull
    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;

    @NotNull
    @Column(name = "salary_rate", nullable = false)
    private Long salaryRate;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "train_title", nullable = false)
    private TrainTitle trainTitle;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "is_active", nullable = false)
    private Active isActive;

    @ManyToOne
    private School school;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "teacher")
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Teacher phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public Teacher hireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public Long getSalaryRate() {
        return salaryRate;
    }

    public Teacher salaryRate(Long salaryRate) {
        this.salaryRate = salaryRate;
        return this;
    }

    public void setSalaryRate(Long salaryRate) {
        this.salaryRate = salaryRate;
    }

    public String getTitle() {
        return title;
    }

    public Teacher title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public TrainTitle getTrainTitle() {
        return trainTitle;
    }

    public Teacher trainTitle(TrainTitle trainTitle) {
        this.trainTitle = trainTitle;
        return this;
    }

    public void setTrainTitle(TrainTitle trainTitle) {
        this.trainTitle = trainTitle;
    }

    public Active getIsActive() {
        return isActive;
    }

    public Teacher isActive(Active isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public School getSchool() {
        return school;
    }

    public Teacher school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public User getUser() {
        return user;
    }

    public Teacher user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Teacher lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Teacher addLesson(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.setTeacher(this);
        return this;
    }

    public Teacher removeLesson(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.setTeacher(null);
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
        Teacher teacher = (Teacher) o;
        if (teacher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", salaryRate=" + getSalaryRate() +
            ", title='" + getTitle() + "'" +
            ", trainTitle='" + getTrainTitle() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
