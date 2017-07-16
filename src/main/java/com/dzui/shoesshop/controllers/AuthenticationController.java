package com.dzui.shoesshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.JwtUser;
import com.dzui.shoesshop.services.JwtService;
import com.dzui.shoesshop.utilities.JwtUtility;

@RestController
@CrossOrigin(origins="*")
public class AuthenticationController {
	@Autowired
	private JwtUtility jwtUtility;

	@Autowired
	private JwtService jwtService;

	@RequestMapping(value = "/auth/login", method = RequestMethod.POST)
	public String login(String username, String password) throws Exception {
		JwtUser jwtUser = jwtService.findByUsernameAndPassword(username, password);
		String token = null;

		if (jwtUser != null) {
			token = jwtUtility.getToken(jwtUser);
		} else {
			throw new Exception("Invalid Username or Password");
		}

		return token;
	}
	
	@RequestMapping(value = "/auth/validate", method = RequestMethod.POST)
	public void validateLogin(String token) throws Exception {
		JwtUser jwtUser = jwtUtility.getUser(token);
	}
}
