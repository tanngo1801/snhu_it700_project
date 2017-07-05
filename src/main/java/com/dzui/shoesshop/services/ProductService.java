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
import org.springframework.web.bind.annotation.RequestParam;

import com.dzui.shoesshop.entities.Product;
import com.dzui.shoesshop.repositories.ProductRepository;

@Component
public class ProductService {
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private ProductRepository product_repo;
	
	public Product create(Product product) {
		return product_repo.save(product);
	}
	
	public Product update(Product product) {
		return product_repo.save(product);
	}
	
	public Product findById(int id) {
		return product_repo.findOne(id);
	}
	
	public void delete(int id) {
		product_repo.delete(id);
	}
	
	public Map<Object, Object> filterShoes(@RequestParam Map<String, String> params) {
		Map<Object, Object> result = new HashMap<>();
		List<Product> shoes = new ArrayList<>();
		int page = 0, itemsPerPage = 10;
		
		// Pagination
		if(params.containsKey("page")) {
			page = Integer.parseInt(params.get("page"));
			params.remove("page");
		}
		if(params.containsKey("itemsPerPage")) {
			itemsPerPage = Integer.parseInt(params.get("itemsPerPage"));
			params.remove("itemsPerPage");
		}
		
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
		
		// Get total page
		int maxResults = query.getResultList().size();
		int maxPage = maxResults/itemsPerPage;
		
		// Pagination
		query.setFirstResult(page*itemsPerPage);
		query.setMaxResults(itemsPerPage);
		shoes = query.getResultList();
		
		// Prepare response
		result.put("maxPage", maxPage);
		result.put("shoes", shoes);
		
		return result;
	}
}
