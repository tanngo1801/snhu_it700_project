package com.dzui.shoesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Question;
import com.dzui.shoesshop.repositories.QuestionRepository;

@Component
public class QuestionService {
	@Autowired
	private QuestionRepository question_repo;
	
	public Question create(Question question) {
		return question_repo.save(question);
	}
}
