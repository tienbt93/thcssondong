package com.sd.thcs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sd.thcs.domain.Semester;

import com.sd.thcs.repository.SemesterRepository;
import com.sd.thcs.web.rest.errors.BadRequestAlertException;
import com.sd.thcs.web.rest.util.HeaderUtil;
import com.sd.thcs.web.rest.util.PaginationUtil;
import com.sd.thcs.service.dto.SemesterDTO;
import com.sd.thcs.service.mapper.SemesterMapper;
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
 * REST controller for managing Semester.
 */
@RestController
@RequestMapping("/api")
public class SemesterResource {

    private final Logger log = LoggerFactory.getLogger(SemesterResource.class);

    private static final String ENTITY_NAME = "semester";

    private final SemesterRepository semesterRepository;

    private final SemesterMapper semesterMapper;

    public SemesterResource(SemesterRepository semesterRepository, SemesterMapper semesterMapper) {
        this.semesterRepository = semesterRepository;
        this.semesterMapper = semesterMapper;
    }

    /**
     * POST  /semesters : Create a new semester.
     *
     * @param semesterDTO the semesterDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new semesterDTO, or with status 400 (Bad Request) if the semester has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/semesters")
    @Timed
    public ResponseEntity<SemesterDTO> createSemester(@Valid @RequestBody SemesterDTO semesterDTO) throws URISyntaxException {
        log.debug("REST request to save Semester : {}", semesterDTO);
        if (semesterDTO.getId() != null) {
            throw new BadRequestAlertException("A new semester cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Semester semester = semesterMapper.toEntity(semesterDTO);
        semester = semesterRepository.save(semester);
        SemesterDTO result = semesterMapper.toDto(semester);
        return ResponseEntity.created(new URI("/api/semesters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /semesters : Updates an existing semester.
     *
     * @param semesterDTO the semesterDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated semesterDTO,
     * or with status 400 (Bad Request) if the semesterDTO is not valid,
     * or with status 500 (Internal Server Error) if the semesterDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/semesters")
    @Timed
    public ResponseEntity<SemesterDTO> updateSemester(@Valid @RequestBody SemesterDTO semesterDTO) throws URISyntaxException {
        log.debug("REST request to update Semester : {}", semesterDTO);
        if (semesterDTO.getId() == null) {
            return createSemester(semesterDTO);
        }
        Semester semester = semesterMapper.toEntity(semesterDTO);
        semester = semesterRepository.save(semester);
        SemesterDTO result = semesterMapper.toDto(semester);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, semesterDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /semesters : get all the semesters.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of semesters in body
     */
    @GetMapping("/semesters")
    @Timed
    public ResponseEntity<List<SemesterDTO>> getAllSemesters(Pageable pageable) {
        log.debug("REST request to get a page of Semesters");
        Page<Semester> page = semesterRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/semesters");
        return new ResponseEntity<>(semesterMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /semesters/:id : get the "id" semester.
     *
     * @param id the id of the semesterDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the semesterDTO, or with status 404 (Not Found)
     */
    @GetMapping("/semesters/{id}")
    @Timed
    public ResponseEntity<SemesterDTO> getSemester(@PathVariable Long id) {
        log.debug("REST request to get Semester : {}", id);
        Semester semester = semesterRepository.findOne(id);
        SemesterDTO semesterDTO = semesterMapper.toDto(semester);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(semesterDTO));
    }

    /**
     * DELETE  /semesters/:id : delete the "id" semester.
     *
     * @param id the id of the semesterDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/semesters/{id}")
    @Timed
    public ResponseEntity<Void> deleteSemester(@PathVariable Long id) {
        log.debug("REST request to delete Semester : {}", id);
        semesterRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
