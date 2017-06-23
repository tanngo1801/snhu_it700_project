package com.dzui.shoesshop.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="products")
public class Product {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

	@Column(name="name")
    private String name;
	
	@Column(name="color")
    private String color;
	
	@Column(name="size")
    private int size;
	
	@Column(name="stock")
    private int stock;
	
	@Column(name="price")
    private float price;
	
	@Column(name="activated")
    private boolean activated;
	
	@ManyToOne
    private Type type;
	
	@ManyToOne
    private Brand brand;
	
	@ManyToOne
    private Gender gender;
	
	@OneToMany(mappedBy="product")
	private Set<ProductImage> images;
	
	public Set<ProductImage> getImages() {
		return images;
	}

	public void setImages(Set<ProductImage> images) {
		this.images = images;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public boolean isActivated() {
		return activated;
	}

	public void setActivated(boolean activated) {
		this.activated = activated;
	}

	public Type getType() {
		return type;
	}

	public void setType_id(Type type) {
		this.type = type;
	}

	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}
}
