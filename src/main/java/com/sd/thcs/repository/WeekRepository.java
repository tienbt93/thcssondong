package com.sd.thcs.repository;

import com.sd.thcs.domain.Week;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Week entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WeekRepository extends JpaRepository<Week, Long> {
	
	List<Week> findBySemesterId(Long Id);
}
