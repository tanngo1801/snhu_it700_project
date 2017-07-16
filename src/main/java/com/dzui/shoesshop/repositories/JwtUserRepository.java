package com.dzui.shoesshop.repositories;

import org.springframework.data.repository.CrudRepository;

import com.dzui.shoesshop.entities.JwtUser;

public interface JwtUserRepository extends CrudRepository<JwtUser, Integer> {
	public JwtUser findByUsernameAndPassword(String username, String password);
}
