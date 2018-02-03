package com.sd.thcs.repository;

import com.sd.thcs.domain.Lesson;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the Lesson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
	List<Lesson> findByWeekId(Long weekId);
	@Query(value="select * from lesson where teacher_id =( select tc.id from teacher as tc left join jhi_user as u on tc.user_id = u.id   where u.login =:userLogin )  and week_id =:weekId",nativeQuery=true)
	List<Lesson> findByWeekIdForTeacher(@Param("weekId") Long weekId,@Param("userLogin") String userLogin);
}
