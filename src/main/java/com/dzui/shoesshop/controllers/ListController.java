package com.dzui.shoesshop.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:8888")
public class ListController {
	@GetMapping("/filter-shoes")
	public String filterShoes(String jsonString) {
		return "Hello";
	}
	
	
}
