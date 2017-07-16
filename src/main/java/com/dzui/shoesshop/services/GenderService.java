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

import com.dzui.shoesshop.entities.Gender;
import com.dzui.shoesshop.repositories.GenderRepository;

@Component
public class GenderService {
	@PersistenceContext
	private EntityManager em;

	@Autowired
	private GenderRepository gender_repo;

	public Gender findById(int id) {
		return gender_repo.findOne(id);
	}
	
	public Gender update(Gender brand) {
		return gender_repo.save(brand);
	}
	
	public Gender create(Gender brand) {
		return gender_repo.save(brand);
	}
	
	public void delete(int id) {
		gender_repo.delete(id);
	}
	
	public List<Gender> findAll() {
		return (List<Gender>) gender_repo.findAll();
	}
	
	public Map<Object, Object> filterGenders(Map<String, String> params) {
		Map<Object, Object> result = new HashMap<>();
		List<Gender> genders = new ArrayList<>();
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

		String query_string = "select g from Gender g ";
		if (params.size() != 0) {
			query_string += "where " + conditions + " ";
		}

		TypedQuery<Gender> query = em.createQuery(query_string, Gender.class);
		for (Map.Entry<String, String> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		// Get total page
		int maxResults = query.getResultList().size();
		int maxPage = maxResults/(itemsPerPage+1);

		// Pagination
		query.setFirstResult(page * itemsPerPage);
		query.setMaxResults(itemsPerPage);
		genders = query.getResultList();

		// Prepare response
		result.put("maxPage", maxPage);
		result.put("genders", genders);

		return result;
	}
}
