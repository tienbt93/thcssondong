package com.sd.thcs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sd.thcs.domain.Teacher;

import com.sd.thcs.repository.TeacherRepository;
import com.sd.thcs.web.rest.errors.BadRequestAlertException;
import com.sd.thcs.web.rest.util.HeaderUtil;
import com.sd.thcs.web.rest.util.PaginationUtil;
import com.sd.thcs.service.dto.TeacherDTO;
import com.sd.thcs.service.mapper.TeacherMapper;
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
 * REST controller for managing Teacher.
 */
@RestController
@RequestMapping("/api")
public class TeacherResource {

    private final Logger log = LoggerFactory.getLogger(TeacherResource.class);

    private static final String ENTITY_NAME = "teacher";

    private final TeacherRepository teacherRepository;

    private final TeacherMapper teacherMapper;

    public TeacherResource(TeacherRepository teacherRepository, TeacherMapper teacherMapper) {
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
    }

    /**
     * POST  /teachers : Create a new teacher.
     *
     * @param teacherDTO the teacherDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teacherDTO, or with status 400 (Bad Request) if the teacher has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teachers")
    @Timed
    public ResponseEntity<TeacherDTO> createTeacher(@Valid @RequestBody TeacherDTO teacherDTO) throws URISyntaxException {
        log.debug("REST request to save Teacher : {}", teacherDTO);
        if (teacherDTO.getId() != null) {
            throw new BadRequestAlertException("A new teacher cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Teacher teacher = teacherMapper.toEntity(teacherDTO);
        teacher = teacherRepository.save(teacher);
        TeacherDTO result = teacherMapper.toDto(teacher);
        return ResponseEntity.created(new URI("/api/teachers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teachers : Updates an existing teacher.
     *
     * @param teacherDTO the teacherDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teacherDTO,
     * or with status 400 (Bad Request) if the teacherDTO is not valid,
     * or with status 500 (Internal Server Error) if the teacherDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teachers")
    @Timed
    public ResponseEntity<TeacherDTO> updateTeacher(@Valid @RequestBody TeacherDTO teacherDTO) throws URISyntaxException {
        log.debug("REST request to update Teacher : {}", teacherDTO);
        if (teacherDTO.getId() == null) {
            return createTeacher(teacherDTO);
        }
        Teacher teacher = teacherMapper.toEntity(teacherDTO);
        teacher = teacherRepository.save(teacher);
        TeacherDTO result = teacherMapper.toDto(teacher);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teacherDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /teachers : get all the teachers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of teachers in body
     */
    @GetMapping("/teachers")
    @Timed
    public ResponseEntity<List<TeacherDTO>> getAllTeachers(Pageable pageable) {
        log.debug("REST request to get a page of Teachers");
        Page<Teacher> page = teacherRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/teachers");
        return new ResponseEntity<>(teacherMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /teachers/:id : get the "id" teacher.
     *
     * @param id the id of the teacherDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teacherDTO, or with status 404 (Not Found)
     */
    @GetMapping("/teachers/{id}")
    @Timed
    public ResponseEntity<TeacherDTO> getTeacher(@PathVariable Long id) {
        log.debug("REST request to get Teacher : {}", id);
        Teacher teacher = teacherRepository.findOne(id);
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(teacherDTO));
    }

    /**
     * DELETE  /teachers/:id : delete the "id" teacher.
     *
     * @param id the id of the teacherDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teachers/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        log.debug("REST request to delete Teacher : {}", id);
        teacherRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
