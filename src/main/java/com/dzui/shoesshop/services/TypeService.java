package com.dzui.shoesshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Type;
import com.dzui.shoesshop.repositories.TypeRepository;

@Component
public class TypeService {
	@Autowired
	TypeRepository type_repo;
	
	public List<Type> findAll() {
		return (List<Type>) type_repo.findAll();
	}
}
