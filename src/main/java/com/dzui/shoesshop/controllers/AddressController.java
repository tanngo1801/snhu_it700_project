package com.dzui.shoesshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Address;
import com.dzui.shoesshop.services.AddressService;

@RestController
@CrossOrigin(origins="*")
public class AddressController {
	@Autowired
	private AddressService address_service;

	@RequestMapping(method = RequestMethod.GET, value = "/api/v1/address/update/{id}")
	public Address findAddressById(@PathVariable(value = "id") int id) {
		return address_service.findById(id);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/api/v1/address/update/{id}")
	public Address AddressUpdate(Address address) {
		return address_service.update(address);
	}
}
