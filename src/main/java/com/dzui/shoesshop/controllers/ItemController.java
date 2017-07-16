package com.dzui.shoesshop.controllers;

import java.util.Map;

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

import com.dzui.shoesshop.entities.Address;
import com.dzui.shoesshop.entities.Customer;
import com.dzui.shoesshop.entities.Order;
import com.dzui.shoesshop.entities.OrderDetail;
import com.dzui.shoesshop.entities.Product;
import com.dzui.shoesshop.services.AddressService;
import com.dzui.shoesshop.services.CustomerService;
import com.dzui.shoesshop.services.OrderDetailService;
import com.dzui.shoesshop.services.OrderService;
import com.dzui.shoesshop.services.ProductService;
import com.dzui.shoesshop.services.StatusService;

@RestController
@CrossOrigin(origins="*")
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
	
	@Autowired
	private AddressService address_service;
	
	@GetMapping("/find-the-shoes")
	public Product findTheShoes(int id) {
		Product shoes = product_service.findById(id);
		
		return shoes;
	}
	
	@PostMapping("/place-order")
	public Order placeOrder(@RequestParam Map<String, String> params) throws ParseException {
		System.out.println("-------------------------------------------");
		JSONParser parse = new JSONParser();
		JSONObject jsonObject = new JSONObject();
		Order order = new Order();
		Customer customer = new Customer();
		Address address = new Address();
		
		String addr_string = params.get("shipping_address");
		jsonObject = (JSONObject) parse.parse(addr_string);
		address.setCity(jsonObject.get("city").toString());
		address.setCountryCode(jsonObject.get("country_code").toString());
		address.setLine1(jsonObject.get("line1").toString());
		address.setPostalCode((String) jsonObject.get("postal_code"));
		address.setState(jsonObject.get("state").toString());
		address = address_service.create(address);
		
		String cust_string = params.get("payer_info");
		jsonObject = (JSONObject) parse.parse(cust_string);
		customer.setAddressId(address.getId());
		customer.setEmail(jsonObject.get("email").toString());
		customer.setFirstName(jsonObject.get("first_name").toString());
		customer.setLastName(jsonObject.get("last_name").toString());
		customer.setPaymentCode(jsonObject.get("payer_id").toString());
		customer = customer_service.create(customer);
		
		System.out.println(customer.getId());
		System.out.println("---------------------------------------");
		order.setAmount(Float.parseFloat(params.get("amount")));
		order.setPaypalId(params.get("paypal_id"));
		order.setStatus(status_service.findByName(params.get("status")));
		order.setCustomer(customer);
		order = order_service.create(order);
		
		JSONParser parser = new JSONParser();
		JSONArray array = (JSONArray) parser.parse(params.get("order_details"));
		for (int i = 0; i < array.size(); i++) {
			Object temp = array.get(i);
			jsonObject = (JSONObject) parser.parse(temp.toString());
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setProducts(product_service.findById(Integer.parseInt(jsonObject.get("product_id").toString())));
			orderDetail.setQuantity(Integer.parseInt((String) jsonObject.get("quantity")));
			orderDetail.setOrder(order);
			order_detail_service.create(orderDetail);
		}

		return order;
	}
}
