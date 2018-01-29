package com.sd.thcs.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.sd.thcs.domain.enumeration.TrainTitle;
import com.sd.thcs.domain.enumeration.Active;

/**
 * A DTO for the Teacher entity.
 */
public class TeacherDTO implements Serializable {

    private Long id;

    @NotNull
    private String phoneNumber;

    @NotNull
    private LocalDate hireDate;

    @NotNull
    private Long salaryRate;

    @NotNull
    private String title;

    @NotNull
    private TrainTitle trainTitle;

    @NotNull
    private Active isActive;

    private Long schoolId;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public Long getSalaryRate() {
        return salaryRate;
    }

    public void setSalaryRate(Long salaryRate) {
        this.salaryRate = salaryRate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public TrainTitle getTrainTitle() {
        return trainTitle;
    }

    public void setTrainTitle(TrainTitle trainTitle) {
        this.trainTitle = trainTitle;
    }

    public Active getIsActive() {
        return isActive;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeacherDTO teacherDTO = (TeacherDTO) o;
        if(teacherDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacherDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeacherDTO{" +
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
