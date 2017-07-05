package com.dzui.shoesshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Brand;
import com.dzui.shoesshop.entities.Gender;
import com.dzui.shoesshop.entities.Status;
import com.dzui.shoesshop.entities.Type;
import com.dzui.shoesshop.services.BrandService;
import com.dzui.shoesshop.services.GenderService;
import com.dzui.shoesshop.services.StatusService;
import com.dzui.shoesshop.services.TypeService;

@CrossOrigin(origins = "http://localhost:8888")
@RestController
public class MasterDataController {
	@Autowired
	BrandService brand_service;
	
	@Autowired
	TypeService type_service;
	
	@Autowired
	GenderService gender_service;
	
	@Autowired
	StatusService status_service;
	
	@GetMapping("ajax-get-brands")
	public List<Brand> ajaxGetBrands() {
		List<Brand> brands = brand_service.findAll();	
		return brands;
	}
	
	@GetMapping("ajax-get-styles")
	public List<Type> ajaxGetTypes() {
		List<Type> types = type_service.findAll();	
		return types;
	}
	
	@GetMapping("ajax-get-genders")
	public List<Gender> ajaxGetGenders() {
		List<Gender> genders = gender_service.findAll();	
		return genders;
	}
	
	@GetMapping("ajax-get-statuses")
	public List<Status> ajaxGetStatuses() {
		return status_service.findAll();
	}
}
