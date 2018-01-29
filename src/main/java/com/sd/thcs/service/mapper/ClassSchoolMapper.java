package com.sd.thcs.service.mapper;

import com.sd.thcs.domain.*;
import com.sd.thcs.service.dto.ClassSchoolDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ClassSchool and its DTO ClassSchoolDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClassSchoolMapper extends EntityMapper<ClassSchoolDTO, ClassSchool> {


    @Mapping(target = "lessons", ignore = true)
    ClassSchool toEntity(ClassSchoolDTO classSchoolDTO);

    default ClassSchool fromId(Long id) {
        if (id == null) {
            return null;
        }
        ClassSchool classSchool = new ClassSchool();
        classSchool.setId(id);
        return classSchool;
    }
}
