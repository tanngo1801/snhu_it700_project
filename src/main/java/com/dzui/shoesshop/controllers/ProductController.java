package com.dzui.shoesshop.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Product;
import com.dzui.shoesshop.services.ProductService;

@RestController
@CrossOrigin(origins="http://localhost:8888")
public class ProductController {	
	@Autowired
	private ProductService product_service;

	@RequestMapping(method=RequestMethod.GET, value="api/v1/product/list")
	public Map<Object, Object> filterShoes(@RequestParam Map<String, String> params) {
		return product_service.filterShoes(params);
	}
	
	@PostMapping(value="/api/v1/product/create")
	public Product productCreate(Product product) {
		return product_service.create(product);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/product/update/{id}")
	public Product findProductById(@PathVariable(value="id") int id) {
		return product_service.findById(id);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/v1/product/update/{id}")
	public Product productUpdate(Product product) {
		return product_service.update(product);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/api/v1/product/delete/{id}")
	public boolean productDelete(@PathVariable("id") int id) {
		product_service.delete(id);
		return true;
	}
}
