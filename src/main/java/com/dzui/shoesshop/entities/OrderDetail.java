package com.dzui.shoesshop.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="order_details")
public class OrderDetail {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@ManyToOne(cascade=CascadeType.ALL)
	private Order order;
	
	@ManyToOne
	private Product product;
	
	@Column
	private int quantity;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Order getOrders() {
		return this.order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Product getProducts() {
		return this.product;
	}

	public void setProducts(Product product) {
		this.product = product;
	}

	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
