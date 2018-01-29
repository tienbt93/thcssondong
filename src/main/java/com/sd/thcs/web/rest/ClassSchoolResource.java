package com.sd.thcs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sd.thcs.domain.ClassSchool;

import com.sd.thcs.repository.ClassSchoolRepository;
import com.sd.thcs.web.rest.errors.BadRequestAlertException;
import com.sd.thcs.web.rest.util.HeaderUtil;
import com.sd.thcs.service.dto.ClassSchoolDTO;
import com.sd.thcs.service.mapper.ClassSchoolMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ClassSchool.
 */
@RestController
@RequestMapping("/api")
public class ClassSchoolResource {

    private final Logger log = LoggerFactory.getLogger(ClassSchoolResource.class);

    private static final String ENTITY_NAME = "classSchool";

    private final ClassSchoolRepository classSchoolRepository;

    private final ClassSchoolMapper classSchoolMapper;

    public ClassSchoolResource(ClassSchoolRepository classSchoolRepository, ClassSchoolMapper classSchoolMapper) {
        this.classSchoolRepository = classSchoolRepository;
        this.classSchoolMapper = classSchoolMapper;
    }

    /**
     * POST  /class-schools : Create a new classSchool.
     *
     * @param classSchoolDTO the classSchoolDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new classSchoolDTO, or with status 400 (Bad Request) if the classSchool has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/class-schools")
    @Timed
    public ResponseEntity<ClassSchoolDTO> createClassSchool(@Valid @RequestBody ClassSchoolDTO classSchoolDTO) throws URISyntaxException {
        log.debug("REST request to save ClassSchool : {}", classSchoolDTO);
        if (classSchoolDTO.getId() != null) {
            throw new BadRequestAlertException("A new classSchool cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClassSchool classSchool = classSchoolMapper.toEntity(classSchoolDTO);
        classSchool = classSchoolRepository.save(classSchool);
        ClassSchoolDTO result = classSchoolMapper.toDto(classSchool);
        return ResponseEntity.created(new URI("/api/class-schools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /class-schools : Updates an existing classSchool.
     *
     * @param classSchoolDTO the classSchoolDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated classSchoolDTO,
     * or with status 400 (Bad Request) if the classSchoolDTO is not valid,
     * or with status 500 (Internal Server Error) if the classSchoolDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/class-schools")
    @Timed
    public ResponseEntity<ClassSchoolDTO> updateClassSchool(@Valid @RequestBody ClassSchoolDTO classSchoolDTO) throws URISyntaxException {
        log.debug("REST request to update ClassSchool : {}", classSchoolDTO);
        if (classSchoolDTO.getId() == null) {
            return createClassSchool(classSchoolDTO);
        }
        ClassSchool classSchool = classSchoolMapper.toEntity(classSchoolDTO);
        classSchool = classSchoolRepository.save(classSchool);
        ClassSchoolDTO result = classSchoolMapper.toDto(classSchool);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, classSchoolDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /class-schools : get all the classSchools.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of classSchools in body
     */
    @GetMapping("/class-schools")
    @Timed
    public List<ClassSchoolDTO> getAllClassSchools() {
        log.debug("REST request to get all ClassSchools");
        List<ClassSchool> classSchools = classSchoolRepository.findAll();
        return classSchoolMapper.toDto(classSchools);
        }

    /**
     * GET  /class-schools/:id : get the "id" classSchool.
     *
     * @param id the id of the classSchoolDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the classSchoolDTO, or with status 404 (Not Found)
     */
    @GetMapping("/class-schools/{id}")
    @Timed
    public ResponseEntity<ClassSchoolDTO> getClassSchool(@PathVariable Long id) {
        log.debug("REST request to get ClassSchool : {}", id);
        ClassSchool classSchool = classSchoolRepository.findOne(id);
        ClassSchoolDTO classSchoolDTO = classSchoolMapper.toDto(classSchool);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(classSchoolDTO));
    }

    /**
     * DELETE  /class-schools/:id : delete the "id" classSchool.
     *
     * @param id the id of the classSchoolDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/class-schools/{id}")
    @Timed
    public ResponseEntity<Void> deleteClassSchool(@PathVariable Long id) {
        log.debug("REST request to delete ClassSchool : {}", id);
        classSchoolRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
