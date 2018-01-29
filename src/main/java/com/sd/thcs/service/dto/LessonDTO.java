package com.sd.thcs.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.sd.thcs.domain.enumeration.OrdinalNumber;
import com.sd.thcs.domain.enumeration.Active;

/**
 * A DTO for the Lesson entity.
 */
public class LessonDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant date;

    @NotNull
    private OrdinalNumber ordinalNumber;

    private String lessonTitle;

    @NotNull
    private Active isActive;

    private Long teacherId;

    private Long weekId;

    private Long subjectId;

    private Long roomId;

    private Long classSchoolId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public OrdinalNumber getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(OrdinalNumber ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public String getLessonTitle() {
        return lessonTitle;
    }

    public void setLessonTitle(String lessonTitle) {
        this.lessonTitle = lessonTitle;
    }

    public Active getIsActive() {
        return isActive;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public Long getWeekId() {
        return weekId;
    }

    public void setWeekId(Long weekId) {
        this.weekId = weekId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getClassSchoolId() {
        return classSchoolId;
    }

    public void setClassSchoolId(Long classSchoolId) {
        this.classSchoolId = classSchoolId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LessonDTO lessonDTO = (LessonDTO) o;
        if(lessonDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lessonDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LessonDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", ordinalNumber='" + getOrdinalNumber() + "'" +
            ", lessonTitle='" + getLessonTitle() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
