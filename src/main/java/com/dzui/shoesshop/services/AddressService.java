package com.dzui.shoesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.repositories.AddressRepository;

@Component
public class AddressService {
	@Autowired
	private AddressRepository address_repo;
}