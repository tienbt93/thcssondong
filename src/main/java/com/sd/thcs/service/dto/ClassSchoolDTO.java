package com.sd.thcs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.sd.thcs.domain.enumeration.Active;

/**
 * A DTO for the ClassSchool entity.
 */
public class ClassSchoolDTO implements Serializable {

    private Long id;

    @NotNull
    private String className;

    private String description;

    @NotNull
    private Active isActive;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

        ClassSchoolDTO classSchoolDTO = (ClassSchoolDTO) o;
        if(classSchoolDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classSchoolDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClassSchoolDTO{" +
            "id=" + getId() +
            ", className='" + getClassName() + "'" +
            ", description='" + getDescription() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
