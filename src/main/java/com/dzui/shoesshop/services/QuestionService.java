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

import com.dzui.shoesshop.entities.Question;
import com.dzui.shoesshop.repositories.QuestionRepository;

@Component
public class QuestionService {
	@PersistenceContext
	private EntityManager em;

	@Autowired
	QuestionRepository question_repo;

	public Question findById(int id) {
		return question_repo.findOne(id);
	}
	
	public Question update(Question question) {
		return question_repo.save(question);
	}
	
	public Question create(Question question) {
		return question_repo.save(question);
	}
	
	public void delete(int id) {
		question_repo.delete(id);
	}
	
	public List<Question> findAll() {
		return (List<Question>) question_repo.findAll();
	}
	
	public Map<Object, Object> filterQuestions(Map<String, String> params) {
		Map<Object, Object> result = new HashMap<>();
		List<Question> questions = new ArrayList<>();
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

		String query_string = "select p from Question p ";
		if (params.size() != 0) {
			query_string += "where " + conditions + " ";
		}

		// Order by created_at
		query_string += "order by watched, created_at desc";
		
		TypedQuery<Question> query = em.createQuery(query_string, Question.class);
		for (Map.Entry<String, String> entry : params.entrySet()) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		// Get total page
		int maxResults = query.getResultList().size();
		int maxPage = maxResults/(itemsPerPage+1);

		// Pagination
		query.setFirstResult(page * itemsPerPage);
		query.setMaxResults(itemsPerPage);
		questions = query.getResultList();

		// Prepare response
		result.put("maxPage", maxPage);
		result.put("questions", questions);

		return result;
	}
}
