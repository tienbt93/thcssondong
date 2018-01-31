package com.sd.thcs.service.dto;


import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.NotNull;

import com.sd.thcs.domain.enumeration.Active;
import com.sd.thcs.domain.enumeration.DateOfWeek;
import com.sd.thcs.domain.enumeration.OrdinalNumber;

/**
 * A DTO for the Lesson entity.
 */
public class LessonDTO implements Serializable {

    private Long id;

    @NotNull
    private DateOfWeek dow;

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
    
    private String teacherName;

    private String weekName;

    private String subjectName;

    private String roomName;

    private String className;
   
	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getWeekName() {
		return weekName;
	}

	public void setWeekName(String weekName) {
		this.weekName = weekName;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DateOfWeek getDow() {
        return dow;
    }

    public void setDow(DateOfWeek dow) {
        this.dow = dow;
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
            ", dow='" + getDow() + "'" +
            ", ordinalNumber='" + getOrdinalNumber() + "'" +
            ", lessonTitle='" + getLessonTitle() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
