package com.dzui.shoesshop.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Type;
import com.dzui.shoesshop.services.TypeService;

@RestController
@CrossOrigin(origins="http://localhost:8888")
public class TypeController {
	@Autowired
	private TypeService type_service;
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/type/list")
	public Map<Object, Object> filterTypes(@RequestParam Map<String, String> params) {
		return type_service.filterTypes(params);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/type/update/{id}")
	public Type findTypeById(@PathVariable(value="id") int id) {
		return type_service.findById(id);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/v1/type/update/{id}")
	public Type typeUpdate(Type type) {
		return type_service.update(type);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/api/v1/type/create")
	public Type typeCreate(Type type) {
		return type_service.update(type);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/api/v1/type/delete/{id}")
	public boolean typeDelete(@PathVariable("id") int id) {
		type_service.delete(id);
		return true;
	}
}
