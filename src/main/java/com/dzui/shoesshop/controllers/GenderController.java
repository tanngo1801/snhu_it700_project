package com.dzui.shoesshop.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Gender;
import com.dzui.shoesshop.services.GenderService;

@RestController
@CrossOrigin(origins="*")
public class GenderController {
	@Autowired
	private GenderService gender_service;
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/gender/list")
	public Map<Object, Object> filtergenders(@RequestParam Map<String, String> params) {
		return gender_service.filterGenders(params);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/gender/update/{id}")
	public Gender findgenderById(@PathVariable(value="id") int id) {
		return gender_service.findById(id);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/v1/gender/update/{id}")
	public Gender genderUpdate(Gender gender) {
		return gender_service.update(gender);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/api/v1/gender/create")
	public Gender genderCreate(Gender gender) {
		return gender_service.update(gender);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/api/v1/gender/delete/{id}")
	public boolean genderDelete(@PathVariable("id") int id) {
		gender_service.delete(id);
		return true;
	}
}
