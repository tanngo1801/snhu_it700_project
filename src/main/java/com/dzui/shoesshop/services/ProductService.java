package com.dzui.shoesshop.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.Product;
import com.dzui.shoesshop.repositories.ProductRepository;

@Component
public class ProductService {
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private ProductRepository product_repo;
	
	public Product findById(int id) {
		return product_repo.findOne(id);
	}
	
	public List<Product> filterShoes(Map<String, String> params) {
		List<Product> shoes = new ArrayList<>();
		
		String conditions = "";
		Iterator<Map.Entry<String, String>> it = params.entrySet().iterator();
		int count = 0;
		while(it.hasNext()) {
			Map.Entry<String, String> entry = it.next();
			count++;
			if(entry.getKey().equals("pmin")) {
				conditions += "price" + ">=" + ":" + entry.getKey();
			}
			else if(entry.getKey().equals("pmax")) {
				conditions += "price" + "<=" + ":" + entry.getKey();
			}
			else {
				conditions += entry.getKey() + "=" + ":" + entry.getKey();
			}
			if(it.hasNext()) {
				conditions += " and ";
			}
			else {
				conditions += " ";
			}
		}


		String query_string = "select p from Product p ";
		if(params.size() != 0) {
			query_string += "where " + conditions + " ";
		}
		
		TypedQuery<Product> query = em.createQuery(query_string, Product.class);
		for (Map.Entry<String, String> entry : params.entrySet()) {
			if(entry.getValue().matches("^\\d+$")) {
				query.setParameter(entry.getKey(), Integer.parseInt(entry.getValue()));
			}
			else if(entry.getValue().matches("^\\d+\\.\\d+$")) {
				query.setParameter(entry.getKey(), Double.parseDouble(entry.getValue()));
			}
			else {
				query.setParameter(entry.getKey(), entry.getValue());
			}
			
		}
		
		shoes = query.getResultList();
		
		return shoes;
	}
}
