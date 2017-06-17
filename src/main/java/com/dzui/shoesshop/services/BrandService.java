package com.dzui.shoesshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Brand;
import com.dzui.shoesshop.repositories.BrandRepository;

@Component
public class BrandService {
	@Autowired
	BrandRepository brand_repo;
	
	public List<Brand> findAll() {
		return (List<Brand>) brand_repo.findAll();
	}
}
