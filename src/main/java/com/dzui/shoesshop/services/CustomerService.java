package com.dzui.shoesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Customer;
import com.dzui.shoesshop.repositories.CustomerRepository;

@Component
public class CustomerService {
	@Autowired
	private CustomerRepository customer_repo;
	
	public Customer findByEmail(String email) {
		return customer_repo.findByEmail(email);
	}
	
	public Customer update(Customer customer) {
		return customer_repo.save(customer);
	}
	
	public Customer create(Customer customer) {
		return customer_repo.save(customer);
	}
}
