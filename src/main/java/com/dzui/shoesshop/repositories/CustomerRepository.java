package com.dzui.shoesshop.repositories;

import org.springframework.data.repository.CrudRepository;

import com.dzui.shoesshop.entities.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {
	public Customer findByEmail(String email);
}
