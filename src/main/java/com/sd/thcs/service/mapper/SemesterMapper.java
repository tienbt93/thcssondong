package com.sd.thcs.service.mapper;

import com.sd.thcs.domain.*;
import com.sd.thcs.service.dto.SemesterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Semester and its DTO SemesterDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SemesterMapper extends EntityMapper<SemesterDTO, Semester> {


    @Mapping(target = "weeks", ignore = true)
    Semester toEntity(SemesterDTO semesterDTO);

    default Semester fromId(Long id) {
        if (id == null) {
            return null;
        }
        Semester semester = new Semester();
        semester.setId(id);
        return semester;
    }
}
