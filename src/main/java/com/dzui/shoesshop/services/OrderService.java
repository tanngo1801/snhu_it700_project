package com.dzui.shoesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Order;
import com.dzui.shoesshop.repositories.OrderRepository;

@Component
public class OrderService {
	@Autowired
	private OrderRepository order_repo;
	
	public Order create(Order order) {
		return order_repo.save(order);
	}
}
