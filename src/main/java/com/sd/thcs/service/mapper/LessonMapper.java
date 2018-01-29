package com.sd.thcs.service.mapper;

import com.sd.thcs.domain.*;
import com.sd.thcs.service.dto.LessonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Lesson and its DTO LessonDTO.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class, WeekMapper.class, SubjectMapper.class, RoomMapper.class, ClassSchoolMapper.class})
public interface LessonMapper extends EntityMapper<LessonDTO, Lesson> {

    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "week.id", target = "weekId")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "room.id", target = "roomId")
    @Mapping(source = "classSchool.id", target = "classSchoolId")
    LessonDTO toDto(Lesson lesson);

    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(source = "weekId", target = "week")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "roomId", target = "room")
    @Mapping(source = "classSchoolId", target = "classSchool")
    Lesson toEntity(LessonDTO lessonDTO);

    default Lesson fromId(Long id) {
        if (id == null) {
            return null;
        }
        Lesson lesson = new Lesson();
        lesson.setId(id);
        return lesson;
    }
}
