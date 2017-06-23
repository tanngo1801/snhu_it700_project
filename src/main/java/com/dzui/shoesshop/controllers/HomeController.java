package com.dzui.shoesshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Question;
import com.dzui.shoesshop.services.QuestionService;

@RestController
@CrossOrigin(origins = "http://localhost:8888")
public class HomeController {
	@Autowired
	private QuestionService question_service;
	
	@PostMapping("send-question")
	public Question sendQuestion(@RequestBody Question question) {
		return question_service.create(question);
	}
}
