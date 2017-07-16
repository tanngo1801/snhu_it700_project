package com.dzui.shoesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.JwtUser;
import com.dzui.shoesshop.repositories.JwtUserRepository;

@Component
public class JwtService {
	@Autowired
	private JwtUserRepository jwtUser_repo;
	
	public JwtUser findByUsernameAndPassword(String username, String password) {
		return jwtUser_repo.findByUsernameAndPassword(username, password);
	}
}
