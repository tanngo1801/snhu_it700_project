package com.dzui.shoesshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Status;
import com.dzui.shoesshop.repositories.StatusRepository;

@Component
public class StatusService {
	@Autowired
	private StatusRepository status_repo;
	
	public Status findByName(String name) {
		return status_repo.findByName(name);
	}
	
	public Status findById(int id) {
		return status_repo.findOne(id);
	}
	
	public List<Status> findAll() {
		return (List<Status>) status_repo.findAll();
	}
}
