package com.sd.thcs.service.mapper;

import com.sd.thcs.domain.*;
import com.sd.thcs.service.dto.TeacherDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Teacher and its DTO TeacherDTO.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class, UserMapper.class})
public interface TeacherMapper extends EntityMapper<TeacherDTO, Teacher> {

    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "school.schoolNam", target = "schoolName")
    @Mapping(source = "user.login", target = "userLogin")
    TeacherDTO toDto(Teacher teacher);

    @Mapping(source = "schoolId", target = "school")
    @Mapping(source = "userId", target = "user")
    @Mapping(target = "lessons", ignore = true)
    Teacher toEntity(TeacherDTO teacherDTO);

    default Teacher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(id);
        return teacher;
    }
}
