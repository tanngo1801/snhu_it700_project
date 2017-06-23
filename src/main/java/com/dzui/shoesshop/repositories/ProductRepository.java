package com.dzui.shoesshop.repositories;

import org.springframework.data.repository.CrudRepository;

import com.dzui.shoesshop.entities.Product;

public interface ProductRepository extends CrudRepository<Product, Integer> {
	
}
