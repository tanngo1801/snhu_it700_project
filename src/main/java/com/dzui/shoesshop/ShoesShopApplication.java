package com.dzui.shoesshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan(value="com.dzui.shoesshop.configurations")
public class ShoesShopApplication {	
	public static void main(String[] args) {
		SpringApplication.run(ShoesShopApplication.class, args);
	}
}
