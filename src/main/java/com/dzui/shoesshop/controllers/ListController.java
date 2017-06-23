package com.dzui.shoesshop.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Product;
import com.dzui.shoesshop.services.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:8888")
public class ListController {
	@Autowired
	private ProductService product_service;
	
	@GetMapping("/filter-shoes")
	public List<Product> filterShoes(@RequestParam Map<String,String> allRequestParams) {
		List<Product> shoes = product_service.filterShoes(allRequestParams);
		
		return shoes;
	}
}
