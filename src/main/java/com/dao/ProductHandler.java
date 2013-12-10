package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.pojo.Product;

public class ProductHandler {
	
	private static final String QUERY_ALL_PRODUCTS = "SELECT * FROM products";
	private static final String INSERT_NEW_PRODUCT = "INSERT INTO products (prod_brand, prod_name, description, stock, price) VALUES (?,?,?,?,?)";
	private static final String REMOVE_PRODUCT = "DELETE FROM products WHERE id = ?" ;
	private static final String GET_PRODUCT_BY_ID = "SELECT * FROM products WHERE id = ?";
	
	public ArrayList<Product> getAllProducts(Connection connection) {
		
		ArrayList<Product> productList = new ArrayList<Product>();
		try {
			PreparedStatement ps = connection
					.prepareStatement(QUERY_ALL_PRODUCTS);
			
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Product prod = new Product();
				prod.setId(Integer.valueOf(rs.getString("id")));
				prod.setProdName(rs.getString("prod_name"));
				prod.setProdBrand(rs.getString("prod_brand"));
				prod.setDescription(rs.getString("description"));
				prod.setStock(rs.getString("stock"));
				prod.setPrice(String.valueOf(rs.getDouble("price")));
				
				productList.add(prod);
			}
			
		}catch(SQLException ex) {
			ex.printStackTrace();
		}
		
		return productList;		
	}

	public void addNewProduct(Connection connection, Product prod) {
		
		try {
			PreparedStatement ps = connection
					.prepareStatement(INSERT_NEW_PRODUCT);
			
			ps.setString(1, prod.getProdBrand());
			ps.setString(2, prod.getProdName());
			ps.setString(3, prod.getDescription());
			ps.setString(4, prod.getStock());
			ps.setDouble(5, Double.valueOf(prod.getPrice()));
			
			ps.execute();
						
		}catch(SQLException ex) {
			ex.printStackTrace();
		}
		
	}

	public void removeProdById(Connection connection, String id) {
		try {
			PreparedStatement ps = connection
					.prepareStatement(REMOVE_PRODUCT);
			
			ps.setInt(1,Integer.valueOf(id));
			
			ps.execute();
						
		}catch(SQLException ex) {
			ex.printStackTrace();
		}		
	}

	public Product getProdById(Connection connection, String id) {
		Product aProd = new Product();
		
		try {
			PreparedStatement ps = connection
					.prepareStatement(GET_PRODUCT_BY_ID);
			
			ps.setInt(1,Integer.valueOf(id));
			
			ResultSet rs = ps.executeQuery();
			
			if(rs != null && rs.next()) {
				aProd.setId(rs.getInt("id"));
				aProd.setProdBrand(rs.getString("prod_brand"));
				aProd.setProdName(rs.getString("prod_name"));
				aProd.setDescription(rs.getString("description"));
				aProd.setStock(rs.getString("stock"));
				aProd.setPrice(String.valueOf(rs.getDouble("price")));
			}
						
		}catch(SQLException ex) {
			ex.printStackTrace();
		}	
		
		return aProd;
	}
	
}
