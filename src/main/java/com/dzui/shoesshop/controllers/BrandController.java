package com.dzui.shoesshop.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Brand;
import com.dzui.shoesshop.services.BrandService;

@RestController
@CrossOrigin(origins="http://localhost:8888")
public class BrandController {	
	@Autowired
	private BrandService brand_service;
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/brand/list")
	public Map<Object, Object> filterBrands(@RequestParam Map<String, String> params) {
		return brand_service.filterBrands(params);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/brand/update/{id}")
	public Brand findBrandById(@PathVariable(value="id") int id) {
		return brand_service.findById(id);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/v1/brand/update/{id}")
	public Brand brandUpdate(Brand brand) {
		return brand_service.update(brand);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/api/v1/brand/create")
	public Brand brandCreate(Brand brand) {
		return brand_service.update(brand);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/api/v1/brand/delete/{id}")
	public boolean brandDelete(@PathVariable("id") int id) {
		brand_service.delete(id);
		return true;
	}
}
