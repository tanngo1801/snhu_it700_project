package com.dzui.shoesshop.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Order;
import com.dzui.shoesshop.entities.Status;
import com.dzui.shoesshop.services.OrderService;
import com.dzui.shoesshop.services.StatusService;

@RestController
@CrossOrigin(origins="http://localhost:8888")
public class OrderController {
	@Autowired
	private OrderService order_service;
	
	@Autowired
	private StatusService status_service;
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/order/list")
	public Map<Object, Object> filterOrders(@RequestParam Map<String, String> params) {
		return order_service.filterOrders(params);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/v1/order/update/{id}")
	public Order findOrderById(@PathVariable(value="id") int id) {
		return order_service.findById(id);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/v1/order/update/{id}")
	public Order orderUpdate(@RequestParam Map<String, String> params) {		
		int order_id = Integer.parseInt(params.get("id"));
		String paypal_id = params.get("paypal_id");
		float amount = Float.parseFloat(params.get("amount"));
		int status_id = Integer.parseInt(params.get("status_id"));
		
		Status status = status_service.findById(status_id);
		Order order = order_service.findById(order_id);
		order.setStatus(status);
		order.setPaypalId(paypal_id);
		order.setAmount(amount);
		
		return order_service.update(order);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/api/v1/order/create")
	public Order orderCreate(Order order) {
		return order_service.update(order);
	}
	
}
