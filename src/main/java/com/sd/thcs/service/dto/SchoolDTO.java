package com.sd.thcs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.sd.thcs.domain.enumeration.Active;

/**
 * A DTO for the School entity.
 */
public class SchoolDTO implements Serializable {

    private Long id;

    @NotNull
    private String schoolNam;

    @NotNull
    private String schoolAddress;

    @NotNull
    private String phoneNumber;

    @NotNull
    private String email;

    @NotNull
    private Active isActive;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSchoolNam() {
        return schoolNam;
    }

    public void setSchoolNam(String schoolNam) {
        this.schoolNam = schoolNam;
    }

    public String getSchoolAddress() {
        return schoolAddress;
    }

    public void setSchoolAddress(String schoolAddress) {
        this.schoolAddress = schoolAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

        SchoolDTO schoolDTO = (SchoolDTO) o;
        if(schoolDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schoolDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SchoolDTO{" +
            "id=" + getId() +
            ", schoolNam='" + getSchoolNam() + "'" +
            ", schoolAddress='" + getSchoolAddress() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
