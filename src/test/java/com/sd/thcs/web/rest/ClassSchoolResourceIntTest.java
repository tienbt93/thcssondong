package com.sd.thcs.web.rest;

import com.sd.thcs.ThcssondongApp;

import com.sd.thcs.domain.ClassSchool;
import com.sd.thcs.repository.ClassSchoolRepository;
import com.sd.thcs.service.dto.ClassSchoolDTO;
import com.sd.thcs.service.mapper.ClassSchoolMapper;
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
 * Test class for the ClassSchoolResource REST controller.
 *
 * @see ClassSchoolResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ThcssondongApp.class)
public class ClassSchoolResourceIntTest {

    private static final String DEFAULT_CLASS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CLASS_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Active DEFAULT_IS_ACTIVE = Active.DEACTIVE;
    private static final Active UPDATED_IS_ACTIVE = Active.ACTIVE;

    @Autowired
    private ClassSchoolRepository classSchoolRepository;

    @Autowired
    private ClassSchoolMapper classSchoolMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClassSchoolMockMvc;

    private ClassSchool classSchool;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClassSchoolResource classSchoolResource = new ClassSchoolResource(classSchoolRepository, classSchoolMapper);
        this.restClassSchoolMockMvc = MockMvcBuilders.standaloneSetup(classSchoolResource)
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
    public static ClassSchool createEntity(EntityManager em) {
        ClassSchool classSchool = new ClassSchool()
            .className(DEFAULT_CLASS_NAME)
            .description(DEFAULT_DESCRIPTION)
            .isActive(DEFAULT_IS_ACTIVE);
        return classSchool;
    }

    @Before
    public void initTest() {
        classSchool = createEntity(em);
    }

    @Test
    @Transactional
    public void createClassSchool() throws Exception {
        int databaseSizeBeforeCreate = classSchoolRepository.findAll().size();

        // Create the ClassSchool
        ClassSchoolDTO classSchoolDTO = classSchoolMapper.toDto(classSchool);
        restClassSchoolMockMvc.perform(post("/api/class-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classSchoolDTO)))
            .andExpect(status().isCreated());

        // Validate the ClassSchool in the database
        List<ClassSchool> classSchoolList = classSchoolRepository.findAll();
        assertThat(classSchoolList).hasSize(databaseSizeBeforeCreate + 1);
        ClassSchool testClassSchool = classSchoolList.get(classSchoolList.size() - 1);
        assertThat(testClassSchool.getClassName()).isEqualTo(DEFAULT_CLASS_NAME);
        assertThat(testClassSchool.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testClassSchool.getIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void createClassSchoolWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = classSchoolRepository.findAll().size();

        // Create the ClassSchool with an existing ID
        classSchool.setId(1L);
        ClassSchoolDTO classSchoolDTO = classSchoolMapper.toDto(classSchool);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassSchoolMockMvc.perform(post("/api/class-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classSchoolDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClassSchool in the database
        List<ClassSchool> classSchoolList = classSchoolRepository.findAll();
        assertThat(classSchoolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkClassNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = classSchoolRepository.findAll().size();
        // set the field null
        classSchool.setClassName(null);

        // Create the ClassSchool, which fails.
        ClassSchoolDTO classSchoolDTO = classSchoolMapper.toDto(classSchool);

        restClassSchoolMockMvc.perform(post("/api/class-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classSchoolDTO)))
            .andExpect(status().isBadRequest());

        List<ClassSchool> classSchoolList = classSchoolRepository.findAll();
        assertThat(classSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = classSchoolRepository.findAll().size();
        // set the field null
        classSchool.setIsActive(null);

        // Create the ClassSchool, which fails.
        ClassSchoolDTO classSchoolDTO = classSchoolMapper.toDto(classSchool);

        restClassSchoolMockMvc.perform(post("/api/class-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classSchoolDTO)))
            .andExpect(status().isBadRequest());

        List<ClassSchool> classSchoolList = classSchoolRepository.findAll();
        assertThat(classSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClassSchools() throws Exception {
        // Initialize the database
        classSchoolRepository.saveAndFlush(classSchool);

        // Get all the classSchoolList
        restClassSchoolMockMvc.perform(get("/api/class-schools?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classSchool.getId().intValue())))
            .andExpect(jsonPath("$.[*].className").value(hasItem(DEFAULT_CLASS_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.toString())));
    }

    @Test
    @Transactional
    public void getClassSchool() throws Exception {
        // Initialize the database
        classSchoolRepository.saveAndFlush(classSchool);

        // Get the classSchool
        restClassSchoolMockMvc.perform(get("/api/class-schools/{id}", classSchool.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(classSchool.getId().intValue()))
            .andExpect(jsonPath("$.className").value(DEFAULT_CLASS_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClassSchool() throws Exception {
        // Get the classSchool
        restClassSchoolMockMvc.perform(get("/api/class-schools/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClassSchool() throws Exception {
        // Initialize the database
        classSchoolRepository.saveAndFlush(classSchool);
        int databaseSizeBeforeUpdate = classSchoolRepository.findAll().size();

        // Update the classSchool
        ClassSchool updatedClassSchool = classSchoolRepository.findOne(classSchool.getId());
        // Disconnect from session so that the updates on updatedClassSchool are not directly saved in db
        em.detach(updatedClassSchool);
        updatedClassSchool
            .className(UPDATED_CLASS_NAME)
            .description(UPDATED_DESCRIPTION)
            .isActive(UPDATED_IS_ACTIVE);
        ClassSchoolDTO classSchoolDTO = classSchoolMapper.toDto(updatedClassSchool);

        restClassSchoolMockMvc.perform(put("/api/class-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classSchoolDTO)))
            .andExpect(status().isOk());

        // Validate the ClassSchool in the database
        List<ClassSchool> classSchoolList = classSchoolRepository.findAll();
        assertThat(classSchoolList).hasSize(databaseSizeBeforeUpdate);
        ClassSchool testClassSchool = classSchoolList.get(classSchoolList.size() - 1);
        assertThat(testClassSchool.getClassName()).isEqualTo(UPDATED_CLASS_NAME);
        assertThat(testClassSchool.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testClassSchool.getIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingClassSchool() throws Exception {
        int databaseSizeBeforeUpdate = classSchoolRepository.findAll().size();

        // Create the ClassSchool
        ClassSchoolDTO classSchoolDTO = classSchoolMapper.toDto(classSchool);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClassSchoolMockMvc.perform(put("/api/class-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classSchoolDTO)))
            .andExpect(status().isCreated());

        // Validate the ClassSchool in the database
        List<ClassSchool> classSchoolList = classSchoolRepository.findAll();
        assertThat(classSchoolList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClassSchool() throws Exception {
        // Initialize the database
        classSchoolRepository.saveAndFlush(classSchool);
        int databaseSizeBeforeDelete = classSchoolRepository.findAll().size();

        // Get the classSchool
        restClassSchoolMockMvc.perform(delete("/api/class-schools/{id}", classSchool.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClassSchool> classSchoolList = classSchoolRepository.findAll();
        assertThat(classSchoolList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassSchool.class);
        ClassSchool classSchool1 = new ClassSchool();
        classSchool1.setId(1L);
        ClassSchool classSchool2 = new ClassSchool();
        classSchool2.setId(classSchool1.getId());
        assertThat(classSchool1).isEqualTo(classSchool2);
        classSchool2.setId(2L);
        assertThat(classSchool1).isNotEqualTo(classSchool2);
        classSchool1.setId(null);
        assertThat(classSchool1).isNotEqualTo(classSchool2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassSchoolDTO.class);
        ClassSchoolDTO classSchoolDTO1 = new ClassSchoolDTO();
        classSchoolDTO1.setId(1L);
        ClassSchoolDTO classSchoolDTO2 = new ClassSchoolDTO();
        assertThat(classSchoolDTO1).isNotEqualTo(classSchoolDTO2);
        classSchoolDTO2.setId(classSchoolDTO1.getId());
        assertThat(classSchoolDTO1).isEqualTo(classSchoolDTO2);
        classSchoolDTO2.setId(2L);
        assertThat(classSchoolDTO1).isNotEqualTo(classSchoolDTO2);
        classSchoolDTO1.setId(null);
        assertThat(classSchoolDTO1).isNotEqualTo(classSchoolDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(classSchoolMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(classSchoolMapper.fromId(null)).isNull();
    }
}
