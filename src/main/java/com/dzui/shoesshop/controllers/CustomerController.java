package com.dzui.shoesshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Customer;
import com.dzui.shoesshop.services.CustomerService;

@RestController
@CrossOrigin(origins="*")
public class CustomerController {
	@Autowired
	private CustomerService customer_service;
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/customer/update/{id}")
	public Customer findCustomerById(@PathVariable(value="id") int id) {
		return customer_service.findById(id);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/v1/customer/update/{id}")
	public Customer CustomerUpdate(Customer customer) {
		return customer_service.update(customer);
	}
}
