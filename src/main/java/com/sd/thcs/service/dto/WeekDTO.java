package com.sd.thcs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.sd.thcs.domain.enumeration.Active;

/**
 * A DTO for the Week entity.
 */
public class WeekDTO implements Serializable {

    private Long id;

    @NotNull
    private String weekName;

    @NotNull
    private Active isActive;

    private Long semesterId;

    private String semesterName;
    
    public String getSemesterName() {
		return semesterName;
	}

	public void setSemesterName(String semesterName) {
		this.semesterName = semesterName;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWeekName() {
        return weekName;
    }

    public void setWeekName(String weekName) {
        this.weekName = weekName;
    }

    public Active getIsActive() {
        return isActive;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        WeekDTO weekDTO = (WeekDTO) o;
        if(weekDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), weekDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WeekDTO{" +
            "id=" + getId() +
            ", weekName='" + getWeekName() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
