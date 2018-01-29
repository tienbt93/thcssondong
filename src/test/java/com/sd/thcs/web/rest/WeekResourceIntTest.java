package com.sd.thcs.web.rest;

import com.sd.thcs.ThcssondongApp;

import com.sd.thcs.domain.Week;
import com.sd.thcs.repository.WeekRepository;
import com.sd.thcs.service.dto.WeekDTO;
import com.sd.thcs.service.mapper.WeekMapper;
import com.sd.thcs.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.sd.thcs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sd.thcs.domain.enumeration.Active;
/**
 * Test class for the WeekResource REST controller.
 *
 * @see WeekResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ThcssondongApp.class)
public class WeekResourceIntTest {

    private static final String DEFAULT_WEEK_NAME = "AAAAAAAAAA";
    private static final String UPDATED_WEEK_NAME = "BBBBBBBBBB";

    private static final Active DEFAULT_IS_ACTIVE = Active.DEACTIVE;
    private static final Active UPDATED_IS_ACTIVE = Active.ACTIVE;

    @Autowired
    private WeekRepository weekRepository;

    @Autowired
    private WeekMapper weekMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWeekMockMvc;

    private Week week;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WeekResource weekResource = new WeekResource(weekRepository, weekMapper);
        this.restWeekMockMvc = MockMvcBuilders.standaloneSetup(weekResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Week createEntity(EntityManager em) {
        Week week = new Week()
            .weekName(DEFAULT_WEEK_NAME)
            .isActive(DEFAULT_IS_ACTIVE);
        return week;
    }

    @Before
    public void initTest() {
        week = createEntity(em);
    }

    @Test
    @Transactional
    public void createWeek() throws Exception {
        int databaseSizeBeforeCreate = weekRepository.findAll().size();

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);
        restWeekMockMvc.perform(post("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekDTO)))
            .andExpect(status().isCreated());

        // Validate the Week in the database
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeCreate + 1);
        Week testWeek = weekList.get(weekList.size() - 1);
        assertThat(testWeek.getWeekName()).isEqualTo(DEFAULT_WEEK_NAME);
        assertThat(testWeek.getIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void createWeekWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = weekRepository.findAll().size();

        // Create the Week with an existing ID
        week.setId(1L);
        WeekDTO weekDTO = weekMapper.toDto(week);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWeekMockMvc.perform(post("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkWeekNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = weekRepository.findAll().size();
        // set the field null
        week.setWeekName(null);

        // Create the Week, which fails.
        WeekDTO weekDTO = weekMapper.toDto(week);

        restWeekMockMvc.perform(post("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = weekRepository.findAll().size();
        // set the field null
        week.setIsActive(null);

        // Create the Week, which fails.
        WeekDTO weekDTO = weekMapper.toDto(week);

        restWeekMockMvc.perform(post("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWeeks() throws Exception {
        // Initialize the database
        weekRepository.saveAndFlush(week);

        // Get all the weekList
        restWeekMockMvc.perform(get("/api/weeks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(week.getId().intValue())))
            .andExpect(jsonPath("$.[*].weekName").value(hasItem(DEFAULT_WEEK_NAME.toString())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.toString())));
    }

    @Test
    @Transactional
    public void getWeek() throws Exception {
        // Initialize the database
        weekRepository.saveAndFlush(week);

        // Get the week
        restWeekMockMvc.perform(get("/api/weeks/{id}", week.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(week.getId().intValue()))
            .andExpect(jsonPath("$.weekName").value(DEFAULT_WEEK_NAME.toString()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWeek() throws Exception {
        // Get the week
        restWeekMockMvc.perform(get("/api/weeks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWeek() throws Exception {
        // Initialize the database
        weekRepository.saveAndFlush(week);
        int databaseSizeBeforeUpdate = weekRepository.findAll().size();

        // Update the week
        Week updatedWeek = weekRepository.findOne(week.getId());
        // Disconnect from session so that the updates on updatedWeek are not directly saved in db
        em.detach(updatedWeek);
        updatedWeek
            .weekName(UPDATED_WEEK_NAME)
            .isActive(UPDATED_IS_ACTIVE);
        WeekDTO weekDTO = weekMapper.toDto(updatedWeek);

        restWeekMockMvc.perform(put("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekDTO)))
            .andExpect(status().isOk());

        // Validate the Week in the database
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeUpdate);
        Week testWeek = weekList.get(weekList.size() - 1);
        assertThat(testWeek.getWeekName()).isEqualTo(UPDATED_WEEK_NAME);
        assertThat(testWeek.getIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingWeek() throws Exception {
        int databaseSizeBeforeUpdate = weekRepository.findAll().size();

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWeekMockMvc.perform(put("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekDTO)))
            .andExpect(status().isCreated());

        // Validate the Week in the database
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWeek() throws Exception {
        // Initialize the database
        weekRepository.saveAndFlush(week);
        int databaseSizeBeforeDelete = weekRepository.findAll().size();

        // Get the week
        restWeekMockMvc.perform(delete("/api/weeks/{id}", week.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Week.class);
        Week week1 = new Week();
        week1.setId(1L);
        Week week2 = new Week();
        week2.setId(week1.getId());
        assertThat(week1).isEqualTo(week2);
        week2.setId(2L);
        assertThat(week1).isNotEqualTo(week2);
        week1.setId(null);
        assertThat(week1).isNotEqualTo(week2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WeekDTO.class);
        WeekDTO weekDTO1 = new WeekDTO();
        weekDTO1.setId(1L);
        WeekDTO weekDTO2 = new WeekDTO();
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
        weekDTO2.setId(weekDTO1.getId());
        assertThat(weekDTO1).isEqualTo(weekDTO2);
        weekDTO2.setId(2L);
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
        weekDTO1.setId(null);
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(weekMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(weekMapper.fromId(null)).isNull();
    }
}
