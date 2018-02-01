package com.sd.thcs.service.dto;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

import javax.validation.constraints.NotNull;

import com.sd.thcs.domain.enumeration.Active;

/**
 * A DTO for the Semester entity.
 */
public class SemesterDTO implements Serializable {

    private Long id;

    @NotNull
    private String semesterName;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private Integer totalWeek;

    @NotNull
    private Active isActive;
    
    private boolean isCurrent = false;

    public boolean getIsCurrent() {
    	LocalDate currentDate=LocalDate.now();
    	if(currentDate.compareTo(startDate)>=0&&currentDate.compareTo(endDate)<=0)
    		return true;
		return false;
	}

	public void setCurrent(boolean isCurrent) {
		this.isCurrent = isCurrent;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSemesterName() {
        return semesterName;
    }

    public void setSemesterName(String semesterName) {
        this.semesterName = semesterName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getTotalWeek() {
        return totalWeek;
    }

    public void setTotalWeek(Integer totalWeek) {
        this.totalWeek = totalWeek;
    }

    public Active getIsActive() {
        return isActive;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SemesterDTO semesterDTO = (SemesterDTO) o;
        if(semesterDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), semesterDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SemesterDTO{" +
            "id=" + getId() +
            ", semesterName='" + getSemesterName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", totalWeek=" + getTotalWeek() +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
