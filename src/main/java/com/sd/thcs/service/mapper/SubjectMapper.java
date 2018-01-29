package com.sd.thcs.service.mapper;

import com.sd.thcs.domain.*;
import com.sd.thcs.service.dto.SubjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Subject and its DTO SubjectDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SubjectMapper extends EntityMapper<SubjectDTO, Subject> {


    @Mapping(target = "lessons", ignore = true)
    Subject toEntity(SubjectDTO subjectDTO);

    default Subject fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subject subject = new Subject();
        subject.setId(id);
        return subject;
    }
}
