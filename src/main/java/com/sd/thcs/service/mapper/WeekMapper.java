package com.sd.thcs.service.mapper;

import com.sd.thcs.domain.*;
import com.sd.thcs.service.dto.WeekDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Week and its DTO WeekDTO.
 */
@Mapper(componentModel = "spring", uses = {SemesterMapper.class})
public interface WeekMapper extends EntityMapper<WeekDTO, Week> {

    @Mapping(source = "semester.id", target = "semesterId")
    @Mapping(source = "semester.semesterName", target = "semesterName")
    WeekDTO toDto(Week week);

    @Mapping(source = "semesterId", target = "semester")
    @Mapping(target = "lessons", ignore = true)
    Week toEntity(WeekDTO weekDTO);

    default Week fromId(Long id) {
        if (id == null) {
            return null;
        }
        Week week = new Week();
        week.setId(id);
        return week;
    }
}
