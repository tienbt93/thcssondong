package com.sd.thcs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sd.thcs.domain.Lesson;

import com.sd.thcs.repository.LessonRepository;
import com.sd.thcs.web.rest.errors.BadRequestAlertException;
import com.sd.thcs.web.rest.util.HeaderUtil;
import com.sd.thcs.web.rest.util.PaginationUtil;
import com.sd.thcs.service.dto.LessonDTO;
import com.sd.thcs.service.mapper.LessonMapper;
import com.sd.thcs.service.response.LessonTeacherRp;

import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Lesson.
 */
@RestController
@RequestMapping("/api")
public class LessonResource {

    private final Logger log = LoggerFactory.getLogger(LessonResource.class);

    private static final String ENTITY_NAME = "lesson";

    private final LessonRepository lessonRepository;

    private final LessonMapper lessonMapper;

    public LessonResource(LessonRepository lessonRepository, LessonMapper lessonMapper) {
        this.lessonRepository = lessonRepository;
        this.lessonMapper = lessonMapper;
    }

    /**
     * POST  /lessons : Create a new lesson.
     *
     * @param lessonDTO the lessonDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lessonDTO, or with status 400 (Bad Request) if the lesson has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lessons")
    @Timed
    public ResponseEntity<LessonDTO> createLesson(@Valid @RequestBody LessonDTO lessonDTO) throws URISyntaxException {
        log.debug("REST request to save Lesson : {}", lessonDTO);
        if (lessonDTO.getId() != null) {
            throw new BadRequestAlertException("A new lesson cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lesson lesson = lessonMapper.toEntity(lessonDTO);
        lesson = lessonRepository.save(lesson);
        LessonDTO result = lessonMapper.toDto(lesson);
        return ResponseEntity.created(new URI("/api/lessons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lessons : Updates an existing lesson.
     *
     * @param lessonDTO the lessonDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lessonDTO,
     * or with status 400 (Bad Request) if the lessonDTO is not valid,
     * or with status 500 (Internal Server Error) if the lessonDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lessons")
    @Timed
    public ResponseEntity<LessonDTO> updateLesson(@Valid @RequestBody LessonDTO lessonDTO) throws URISyntaxException {
        log.debug("REST request to update Lesson : {}", lessonDTO);
        if (lessonDTO.getId() == null) {
            return createLesson(lessonDTO);
        }
        Lesson lesson = lessonMapper.toEntity(lessonDTO);
        lesson = lessonRepository.save(lesson);
        LessonDTO result = lessonMapper.toDto(lesson);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lessonDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lessons : get all the lessons.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lessons in body
     */
    @GetMapping("/lessons")
    @Timed
    public ResponseEntity<List<LessonDTO>> getAllLessons(Pageable pageable) {
        log.debug("REST request to get a page of Lessons");
        Page<Lesson> page = lessonRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lessons");
        return new ResponseEntity<>(lessonMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    @GetMapping("/lessons/byweek/{weekid}")
    @Timed
    public ResponseEntity<LessonTeacherRp> getAllLessonsByWeekId(@PathVariable Long weekid) {
		log.debug("REST request to get a page of Lessons");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userLogin = authentication.getName();
		// Long currentPrincipalName = authentication.get();
		List<Lesson> listLesson = lessonRepository.findByWeekIdForTeacher(weekid, userLogin);
		Long[][] mapLesson = new Long[8][7];
		for (Lesson lesson : listLesson) {
			mapLesson[lesson.getOrdinalNumber().ordinal()][lesson.getDow().ordinal()] = new Long(lesson.getId());
		}
		LessonTeacherRp response = new LessonTeacherRp();
		response.setMapLesson(mapLesson);
		response.setListLesson(lessonMapper.toDto(listLesson));
		return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * GET  /lessons/:id : get the "id" lesson.
     *
     * @param id the id of the lessonDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lessonDTO, or with status 404 (Not Found)
     */
    @GetMapping("/lessons/{id}")
    @Timed
    public ResponseEntity<LessonDTO> getLesson(@PathVariable Long id) {
        log.debug("REST request to get Lesson : {}", id);
        Lesson lesson = lessonRepository.findOne(id);
        LessonDTO lessonDTO = lessonMapper.toDto(lesson);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lessonDTO));
    }
    /**
     * DELETE  /lessons/:id : delete the "id" lesson.
     *
     * @param id the id of the lessonDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lessons/{id}")
    @Timed
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        log.debug("REST request to delete Lesson : {}", id);
        lessonRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
