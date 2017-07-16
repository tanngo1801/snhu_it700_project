package com.dzui.shoesshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.OrderDetail;
import com.dzui.shoesshop.repositories.OrderDetailRepository;

@Component
public class OrderDetailService {
	@Autowired
	private OrderDetailRepository order_detail_repo;
	
	public OrderDetail create(OrderDetail order_detail) {
		return order_detail_repo.save(order_detail);
	}
}
