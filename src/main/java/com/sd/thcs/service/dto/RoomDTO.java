package com.sd.thcs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.sd.thcs.domain.enumeration.Active;

/**
 * A DTO for the Room entity.
 */
public class RoomDTO implements Serializable {

    private Long id;

    @NotNull
    private String roomName;

    private String description;

    @NotNull
    private Active isActive;

    private Long schoolId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
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

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RoomDTO roomDTO = (RoomDTO) o;
        if(roomDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), roomDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RoomDTO{" +
            "id=" + getId() +
            ", roomName='" + getRoomName() + "'" +
            ", description='" + getDescription() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
