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

import com.dzui.shoesshop.entities.Type;
import com.dzui.shoesshop.repositories.TypeRepository;

@Component
public class TypeService {
	@PersistenceContext
	private EntityManager em;

	@Autowired
	TypeRepository type_repo;

	public Type findById(int id) {
		return type_repo.findOne(id);
	}
	
	public Type update(Type type) {
		return type_repo.save(type);
	}
	
	public Type create(Type type) {
		return type_repo.save(type);
	}
	
	public void delete(int id) {
		type_repo.delete(id);
	}
	
	public List<Type> findAll() {
		return (List<Type>) type_repo.findAll();
	}
	
	public Map<Object, Object> filterTypes(Map<String, String> params) {
		Map<Object, Object> result = new HashMap<>();
		List<Type> types = new ArrayList<>();
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

		String query_string = "select p from Type p ";
		if (params.size() != 0) {
			query_string += "where " + conditions + " ";
		}

		TypedQuery<Type> query = em.createQuery(query_string, Type.class);
		for (Map.Entry<String, String> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		// Get total page
		int maxResults = query.getResultList().size();
		int maxPage = maxResults / itemsPerPage;

		// Pagination
		query.setFirstResult(page * itemsPerPage);
		query.setMaxResults(itemsPerPage);
		types = query.getResultList();

		// Prepare response
		result.put("maxPage", maxPage);
		result.put("types", types);

		return result;
	}
}
