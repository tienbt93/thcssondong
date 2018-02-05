package com.sd.thcs.service.response;

import java.io.Serializable;
import java.util.List;

import com.sd.thcs.service.dto.LessonDTO;

public class LessonTeacherRp  implements Serializable  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private List<LessonDTO> listLesson;
	private Integer[][] mapLesson;
	
	public LessonTeacherRp() {
		// TODO Auto-generated constructor stub
	}

	public List<LessonDTO> getListLesson() {
		return listLesson;
	}

	public void setListLesson(List<LessonDTO> listLesson) {
		this.listLesson = listLesson;
	}

	public Integer[][] getMapLesson() {
		return mapLesson;
	}

	public void setMapLesson(Integer[][] mapLesson) {
		this.mapLesson = mapLesson;
	}
	
}
