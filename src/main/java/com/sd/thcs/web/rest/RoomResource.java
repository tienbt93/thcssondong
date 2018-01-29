package com.sd.thcs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sd.thcs.domain.Room;

import com.sd.thcs.repository.RoomRepository;
import com.sd.thcs.web.rest.errors.BadRequestAlertException;
import com.sd.thcs.web.rest.util.HeaderUtil;
import com.sd.thcs.web.rest.util.PaginationUtil;
import com.sd.thcs.service.dto.RoomDTO;
import com.sd.thcs.service.mapper.RoomMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Room.
 */
@RestController
@RequestMapping("/api")
public class RoomResource {

    private final Logger log = LoggerFactory.getLogger(RoomResource.class);

    private static final String ENTITY_NAME = "room";

    private final RoomRepository roomRepository;

    private final RoomMapper roomMapper;

    public RoomResource(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    /**
     * POST  /rooms : Create a new room.
     *
     * @param roomDTO the roomDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new roomDTO, or with status 400 (Bad Request) if the room has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rooms")
    @Timed
    public ResponseEntity<RoomDTO> createRoom(@Valid @RequestBody RoomDTO roomDTO) throws URISyntaxException {
        log.debug("REST request to save Room : {}", roomDTO);
        if (roomDTO.getId() != null) {
            throw new BadRequestAlertException("A new room cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Room room = roomMapper.toEntity(roomDTO);
        room = roomRepository.save(room);
        RoomDTO result = roomMapper.toDto(room);
        return ResponseEntity.created(new URI("/api/rooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rooms : Updates an existing room.
     *
     * @param roomDTO the roomDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated roomDTO,
     * or with status 400 (Bad Request) if the roomDTO is not valid,
     * or with status 500 (Internal Server Error) if the roomDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rooms")
    @Timed
    public ResponseEntity<RoomDTO> updateRoom(@Valid @RequestBody RoomDTO roomDTO) throws URISyntaxException {
        log.debug("REST request to update Room : {}", roomDTO);
        if (roomDTO.getId() == null) {
            return createRoom(roomDTO);
        }
        Room room = roomMapper.toEntity(roomDTO);
        room = roomRepository.save(room);
        RoomDTO result = roomMapper.toDto(room);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, roomDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rooms : get all the rooms.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rooms in body
     */
    @GetMapping("/rooms")
    @Timed
    public ResponseEntity<List<RoomDTO>> getAllRooms(Pageable pageable) {
        log.debug("REST request to get a page of Rooms");
        Page<Room> page = roomRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rooms");
        return new ResponseEntity<>(roomMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /rooms/:id : get the "id" room.
     *
     * @param id the id of the roomDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the roomDTO, or with status 404 (Not Found)
     */
    @GetMapping("/rooms/{id}")
    @Timed
    public ResponseEntity<RoomDTO> getRoom(@PathVariable Long id) {
        log.debug("REST request to get Room : {}", id);
        Room room = roomRepository.findOne(id);
        RoomDTO roomDTO = roomMapper.toDto(room);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(roomDTO));
    }

    /**
     * DELETE  /rooms/:id : delete the "id" room.
     *
     * @param id the id of the roomDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rooms/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        log.debug("REST request to delete Room : {}", id);
        roomRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
