package com.dzui.shoesshop.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Column
	private int customer_id;
	
	@ManyToOne
	private Status status;
	
	@Column
	private String paypalId;
	
	@Column
	private float amount;
	
	@Column
	private Date createdAt;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getCustomer() {
		return this.customer_id;
	}

	public void setCustomer(int customer_id) {
		this.customer_id = customer_id;
	}

	public Status getStatus() {
		return this.status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getPaypalId() {
		return this.paypalId;
	}

	public void setPaypalId(String paypalId) {
		this.paypalId = paypalId;
	}

	public float getAmount() {
		return this.amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
}
