package com.dzui.shoesshop.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Order;
import com.dzui.shoesshop.repositories.OrderRepository;

@Component
public class OrderService {
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private OrderRepository order_repo;
	
	public Order findById(int id) {
		return order_repo.findOne(id);
	}
	
	public Order update(Order order) {
		return order_repo.save(order);
	}
	
	public Order create(Order order) {
		return order_repo.save(order);
	}
	
	public void delete(int id) {
		order_repo.delete(id);
	}
	
	public List<Order> findAll() {
		return (List<Order>) order_repo.findAll();
	}
	
	public Map<Object, Object> filterOrders(Map<String, String> params) {
		Map<Object, Object> result = new HashMap<>();
		List<Order> orders = new ArrayList<>();
		int page = 0, itemsPerPage = 10;

		// Pagination
		if (params.containsKey("page")) {
			page = Integer.parseInt(params.get("page"));
			params.remove("page");
		}
		if (params.containsKey("itemsPerPage")) {
			itemsPerPage = Integer.parseInt(params.get("itemsPerPage"));
			params.remove("itemsPerPage");
		}

		String conditions = "";
		Iterator<Map.Entry<String, String>> it = params.entrySet().iterator();
		int count = 0;
		while (it.hasNext()) {
			Map.Entry<String, String> entry = it.next();
			count++;
			conditions += entry.getKey() + "=" + ":" + entry.getKey();

			if (it.hasNext()) {
				conditions += " and ";
			} else {
				conditions += " ";
			}
		}

		String query_string = "select p from Order p ";
		if (params.size() != 0) {
			query_string += "where " + conditions + " ";
		}

		TypedQuery<Order> query = em.createQuery(query_string, Order.class);
		for (Map.Entry<String, String> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		// Get total page
		int maxResults = query.getResultList().size();
		int maxPage = maxResults / itemsPerPage;

		// Pagination
		query.setFirstResult(page * itemsPerPage);
		query.setMaxResults(itemsPerPage);
		orders = query.getResultList();

		// Prepare response
		result.put("maxPage", maxPage);
		result.put("orders", orders);

		return result;
	}
}
