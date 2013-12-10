package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.pojo.Product;

public class ProductHandler {
	
	private static final String QUERY_ALL_PRODUCTS = "SELECT * FROM products";
	private static final String INSERT_NEW_PRODUCT = "INSERT INTO products (prod_brand, prod_name, description, stock, precio) VALUES (?,?,?,?,?)";

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
				prod.setPrice(String.valueOf(rs.getDouble("precio")));
				
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
	
}
