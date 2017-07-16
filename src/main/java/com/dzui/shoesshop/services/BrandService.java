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

import com.dzui.shoesshop.entities.Brand;
import com.dzui.shoesshop.repositories.BrandRepository;

@Component
public class BrandService {
	@PersistenceContext
	private EntityManager em;

	@Autowired
	BrandRepository brand_repo;

	public Brand findById(int id) {
		return brand_repo.findOne(id);
	}
	
	public Brand update(Brand brand) {
		return brand_repo.save(brand);
	}
	
	public Brand create(Brand brand) {
		return brand_repo.save(brand);
	}
	
	public void delete(int id) {
		brand_repo.delete(id);
	}
	
	public List<Brand> findAll() {
		return (List<Brand>) brand_repo.findAll();
	}
	
	public Map<Object, Object> filterBrands(Map<String, String> params) {
		Map<Object, Object> result = new HashMap<>();
		List<Brand> brands = new ArrayList<>();
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

		String query_string = "select p from Brand p ";
		if (params.size() != 0) {
			query_string += "where " + conditions + " ";
		}

		TypedQuery<Brand> query = em.createQuery(query_string, Brand.class);
		for (Map.Entry<String, String> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		// Get total page
		int maxResults = query.getResultList().size();
		int maxPage = maxResults/(itemsPerPage+1);

		// Pagination
		query.setFirstResult(page * itemsPerPage);
		query.setMaxResults(itemsPerPage);
		brands = query.getResultList();

		// Prepare response
		result.put("maxPage", maxPage);
		result.put("brands", brands);

		return result;
	}
}
