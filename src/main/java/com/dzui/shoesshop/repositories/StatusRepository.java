package com.dzui.shoesshop.repositories;

import org.springframework.data.repository.CrudRepository;

import com.dzui.shoesshop.entities.Status;

public interface StatusRepository extends CrudRepository<Status, Integer> {
	public Status findByName(String name);
}
