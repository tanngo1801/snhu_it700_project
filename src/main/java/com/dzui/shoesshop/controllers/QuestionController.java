package com.dzui.shoesshop.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Question;
import com.dzui.shoesshop.services.QuestionService;

@RestController
@CrossOrigin(origins="*")
public class QuestionController {
	@Autowired
	private QuestionService question_service;
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/question/list")
	public Map<Object, Object> filterQuestions(@RequestParam Map<String, String> params) {
		return question_service.filterQuestions(params);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/question/update/{id}")
	public Question findQuestionById(@PathVariable(value="id") int id) {
		return question_service.findById(id);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/v1/question/update/{id}")
	public Question questionUpdate(Question question) {
		return question_service.update(question);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/api/v1/question/create")
	public Question questionCreate(Question question) {
		return question_service.update(question);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/api/v1/question/delete/{id}")
	public boolean questionDelete(@PathVariable("id") int id) {
		question_service.delete(id);
		return true;
	}
}
