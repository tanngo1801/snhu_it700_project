package com.dzui.shoesshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Gender;
import com.dzui.shoesshop.repositories.GenderRepository;

@Component
public class GenderService {
	@Autowired
	GenderRepository gender_repo;
	
	public List<Gender> findAll() {
		return (List<Gender>) gender_repo.findAll();
	}
}
