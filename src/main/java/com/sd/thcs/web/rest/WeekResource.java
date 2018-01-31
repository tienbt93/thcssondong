package com.sd.thcs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sd.thcs.domain.Week;

import com.sd.thcs.repository.WeekRepository;
import com.sd.thcs.web.rest.errors.BadRequestAlertException;
import com.sd.thcs.web.rest.util.HeaderUtil;
import com.sd.thcs.web.rest.util.PaginationUtil;
import com.sd.thcs.service.dto.WeekDTO;
import com.sd.thcs.service.mapper.WeekMapper;
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
 * REST controller for managing Week.
 */
@RestController
@RequestMapping("/api")
public class WeekResource {

    private final Logger log = LoggerFactory.getLogger(WeekResource.class);

    private static final String ENTITY_NAME = "week";

    private final WeekRepository weekRepository;

    private final WeekMapper weekMapper;

    public WeekResource(WeekRepository weekRepository, WeekMapper weekMapper) {
        this.weekRepository = weekRepository;
        this.weekMapper = weekMapper;
    }

    /**
     * POST  /weeks : Create a new week.
     *
     * @param weekDTO the weekDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new weekDTO, or with status 400 (Bad Request) if the week has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/weeks")
    @Timed
    public ResponseEntity<WeekDTO> createWeek(@Valid @RequestBody WeekDTO weekDTO) throws URISyntaxException {
        log.debug("REST request to save Week : {}", weekDTO);
        if (weekDTO.getId() != null) {
            throw new BadRequestAlertException("A new week cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Week week = weekMapper.toEntity(weekDTO);
        week = weekRepository.save(week);
        WeekDTO result = weekMapper.toDto(week);
        return ResponseEntity.created(new URI("/api/weeks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /weeks : Updates an existing week.
     *
     * @param weekDTO the weekDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated weekDTO,
     * or with status 400 (Bad Request) if the weekDTO is not valid,
     * or with status 500 (Internal Server Error) if the weekDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/weeks")
    @Timed
    public ResponseEntity<WeekDTO> updateWeek(@Valid @RequestBody WeekDTO weekDTO) throws URISyntaxException {
        log.debug("REST request to update Week : {}", weekDTO);
        if (weekDTO.getId() == null) {
            return createWeek(weekDTO);
        }
        Week week = weekMapper.toEntity(weekDTO);
        week = weekRepository.save(week);
        WeekDTO result = weekMapper.toDto(week);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, weekDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /weeks : get all the weeks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of weeks in body
     */
    @GetMapping("/weeks")
    @Timed
    public ResponseEntity<List<WeekDTO>> getAllWeeks(Pageable pageable) {
        log.debug("REST request to get a page of Weeks");
        Page<Week> page = weekRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/weeks");
        return new ResponseEntity<>(weekMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }
    @GetMapping("/weeks/weeksBySemesterId/{id}")
    @Timed
    public ResponseEntity<List<WeekDTO>> getAllWeeksBySemesterId(@PathVariable Long id) {
        log.debug("REST request to get a page of Weeks");
        List<Week> list = weekRepository.findBySemesterId(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/weeks");
        return new ResponseEntity<>(weekMapper.toDto(list), HttpStatus.OK);
    }

    /**
     * GET  /weeks/:id : get the "id" week.
     *
     * @param id the id of the weekDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the weekDTO, or with status 404 (Not Found)
     */
    @GetMapping("/weeks/{id}")
    @Timed
    public ResponseEntity<WeekDTO> getWeek(@PathVariable Long id) {
        log.debug("REST request to get Week : {}", id);
        Week week = weekRepository.findOne(id);
        WeekDTO weekDTO = weekMapper.toDto(week);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(weekDTO));
    }

    /**
     * DELETE  /weeks/:id : delete the "id" week.
     *
     * @param id the id of the weekDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/weeks/{id}")
    @Timed
    public ResponseEntity<Void> deleteWeek(@PathVariable Long id) {
        log.debug("REST request to delete Week : {}", id);
        weekRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
