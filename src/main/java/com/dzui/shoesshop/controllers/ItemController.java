package com.dzui.shoesshop.controllers;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dzui.shoesshop.entities.Customer;
import com.dzui.shoesshop.entities.Order;
import com.dzui.shoesshop.entities.OrderDetail;
import com.dzui.shoesshop.entities.Product;
import com.dzui.shoesshop.services.CustomerService;
import com.dzui.shoesshop.services.OrderDetailService;
import com.dzui.shoesshop.services.OrderService;
import com.dzui.shoesshop.services.ProductService;
import com.dzui.shoesshop.services.StatusService;

@RestController
@CrossOrigin(origins = "*")
public class ItemController {
	@Autowired
	private ProductService product_service;
	
	@Autowired
	private StatusService status_service;
	
	@Autowired
	private OrderService order_service;
	
	@Autowired
	private CustomerService customer_service;
	
	@Autowired
	private OrderDetailService order_detail_service;
	
	@GetMapping("/find-the-shoes")
	public Product findTheShoes(int id) {
		Product shoes = product_service.findById(id);
		
		return shoes;
	}
	
	@PostMapping("/place-order")
	public Order placeOrder(@RequestParam Map<String, String> params) throws ParseException {		
		Order order = new Order();
		
		order.setAmount(Float.parseFloat(params.get("amount")));
		order.setPaypalId(params.get("paypal_id"));
		order.setStatus(status_service.findByName(params.get("status")));
		order.setCustomer(customer_service.findByEmail("tanngo1801@gmail.com"));
		order_service.create(order);
		
		JSONParser parser = new JSONParser();
		JSONArray array = (JSONArray) parser.parse(params.get("order_details"));
		for (int i = 0; i < array.size(); i++) {
			Object temp = array.get(i);
			JSONObject jsonObject = (JSONObject) parser.parse(temp.toString());
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setProducts(product_service.findById(Integer.parseInt(jsonObject.get("product_id").toString())));
			orderDetail.setQuantity(Integer.parseInt((String) jsonObject.get("quantity")));
			orderDetail.setOrder(order);
			order_detail_service.create(orderDetail);
		}
		
		 
		return order;
	}
}
