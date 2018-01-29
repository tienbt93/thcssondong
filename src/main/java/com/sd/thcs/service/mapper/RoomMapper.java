package com.sd.thcs.service.mapper;

import com.sd.thcs.domain.*;
import com.sd.thcs.service.dto.RoomDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Room and its DTO RoomDTO.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class})
public interface RoomMapper extends EntityMapper<RoomDTO, Room> {

    @Mapping(source = "school.id", target = "schoolId")
    RoomDTO toDto(Room room);

    @Mapping(source = "schoolId", target = "school")
    @Mapping(target = "lessons", ignore = true)
    Room toEntity(RoomDTO roomDTO);

    default Room fromId(Long id) {
        if (id == null) {
            return null;
        }
        Room room = new Room();
        room.setId(id);
        return room;
    }
}
