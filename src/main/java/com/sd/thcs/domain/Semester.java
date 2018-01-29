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

import com.sd.thcs.domain.enumeration.Active;

/**
 * A Semester.
 */
@Entity
@Table(name = "semester")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Semester implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "semester_name", nullable = false)
    private String semesterName;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @NotNull
    @Column(name = "total_week", nullable = false)
    private Integer totalWeek;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "is_active", nullable = false)
    private Active isActive;

    @OneToMany(mappedBy = "semester")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Week> weeks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSemesterName() {
        return semesterName;
    }

    public Semester semesterName(String semesterName) {
        this.semesterName = semesterName;
        return this;
    }

    public void setSemesterName(String semesterName) {
        this.semesterName = semesterName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Semester startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Semester endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getTotalWeek() {
        return totalWeek;
    }

    public Semester totalWeek(Integer totalWeek) {
        this.totalWeek = totalWeek;
        return this;
    }

    public void setTotalWeek(Integer totalWeek) {
        this.totalWeek = totalWeek;
    }

    public Active getIsActive() {
        return isActive;
    }

    public Semester isActive(Active isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public Set<Week> getWeeks() {
        return weeks;
    }

    public Semester weeks(Set<Week> weeks) {
        this.weeks = weeks;
        return this;
    }

    public Semester addWeek(Week week) {
        this.weeks.add(week);
        week.setSemester(this);
        return this;
    }

    public Semester removeWeek(Week week) {
        this.weeks.remove(week);
        week.setSemester(null);
        return this;
    }

    public void setWeeks(Set<Week> weeks) {
        this.weeks = weeks;
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
        Semester semester = (Semester) o;
        if (semester.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), semester.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Semester{" +
            "id=" + getId() +
            ", semesterName='" + getSemesterName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", totalWeek=" + getTotalWeek() +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
