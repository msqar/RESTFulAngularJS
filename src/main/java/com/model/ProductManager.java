package com.model;

import java.sql.Connection;
import java.util.ArrayList;

import com.dao.DbConnection;
import com.dao.ProductHandler;
import com.pojo.Product;

public class ProductManager {
	
	public ArrayList<Product> getAllProducts() {
		ArrayList<Product> list = new ArrayList<Product>();
		
		try {
			DbConnection db = new DbConnection();
			Connection connection = db.getConnection();
			ProductHandler handler = new ProductHandler();
			list = handler.getAllProducts(connection);
		}catch(Exception e) {
			e.printStackTrace();
		}		
		
		return list;
	}

	public void addNewProduct(Product prod) {
		try {
			DbConnection db = new DbConnection();
			Connection connection = db.getConnection();
			ProductHandler handler = new ProductHandler();
			handler.addNewProduct(connection, prod);
		}catch(Exception e) {
			e.printStackTrace();
		}		
	}

	public void removeProdById(String id) {
		try {
			DbConnection db = new DbConnection();
			Connection connection = db.getConnection();
			ProductHandler handler = new ProductHandler();
			handler.removeProdById(connection, id);
		}catch(Exception e) {
			e.printStackTrace();
		}	
		
	}

	public Product getProductById(String id) {
		Product aProd = new Product();
		
		try {
			DbConnection db = new DbConnection();
			Connection connection = db.getConnection();
			ProductHandler handler = new ProductHandler();
			aProd = handler.getProdById(connection, id);
		}catch(Exception e) {
			e.printStackTrace();
		}	
		
		return aProd;
	}

}
