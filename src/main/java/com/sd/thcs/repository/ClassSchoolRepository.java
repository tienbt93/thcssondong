package com.sd.thcs.repository;

import com.sd.thcs.domain.ClassSchool;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ClassSchool entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClassSchoolRepository extends JpaRepository<ClassSchool, Long> {

}
