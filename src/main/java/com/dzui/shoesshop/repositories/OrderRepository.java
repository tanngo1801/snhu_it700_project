package com.dzui.shoesshop.repositories;

import org.springframework.data.repository.CrudRepository;

import com.dzui.shoesshop.entities.Order;

public interface OrderRepository extends CrudRepository<Order, Integer> {

}
