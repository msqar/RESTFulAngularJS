package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.pojo.Product;

public class ProductHandler {
	
	private static String QUERY_ALL_PRODUCTS = "SELECT * FROM products";
	private static String INSERT_NEW_PRODUCT = "INSERT INTO products (prod_brand, prod_name, description, stock, price, currency) VALUES (?,?,?,?,?,?)";
	private static String REMOVE_PRODUCT = "DELETE FROM products WHERE id = ?" ;
	private static String GET_PRODUCT_BY_ID = "SELECT * FROM products WHERE id = ?";
	private static String UPDATE_PRODUCT_BY_ID = "UPDATE products SET prod_brand = ?, prod_name = ?, description = ?, stock = ?, price = ?, currency = ? WHERE id = ?";
	
	public ArrayList<Product> getAllProducts(Connection connection) throws SQLException {
		PreparedStatement ps = null;
		ArrayList<Product> productList = new ArrayList<Product>();
		try {
			ps = connection
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
				prod.setCurrency(rs.getString("currency"));
				
				productList.add(prod);
			}
			
		}finally {
			closeConnection(connection);
			closeStatement(ps);
		}
		
		return productList;		
	}

	public void addNewProduct(Connection connection, Product prod) throws SQLException {
		PreparedStatement ps = null;
		try {
			ps = connection
					.prepareStatement(INSERT_NEW_PRODUCT);
			
			ps.setString(1, prod.getProdBrand());
			ps.setString(2, prod.getProdName());
			ps.setString(3, prod.getDescription());
			ps.setString(4, prod.getStock());
			ps.setDouble(5, Double.valueOf(prod.getPrice()));
			ps.setString(6, prod.getCurrency());
			
			ps.execute();
						
		}finally {
			closeConnection(connection);
			closeStatement(ps);
		}
		
	}

	public void removeProdById(Connection connection, String id) throws SQLException {
		PreparedStatement ps = null;
		try {
			ps = connection
					.prepareStatement(REMOVE_PRODUCT);
			
			ps.setInt(1,Integer.valueOf(id));
			
			ps.execute();
						
		}finally {
			closeConnection(connection);
			closeStatement(ps);
		}
	}

	public Product getProdById(Connection connection, String id) throws SQLException {
		Product aProd = new Product();
		PreparedStatement ps = null;
		try {
			ps = connection
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
				aProd.setCurrency(rs.getString("currency"));
			}
						
		}finally {
			closeConnection(connection);
			closeStatement(ps);
		}
		
		return aProd;
	}

	public void updateProdById(Connection connection, Product aProd) throws SQLException {
		PreparedStatement ps = null;
		
		try {
			ps = connection
					.prepareStatement(UPDATE_PRODUCT_BY_ID);

			ps.setString(1, aProd.getProdBrand());
			ps.setString(2, aProd.getProdName());
			ps.setString(3, aProd.getDescription());
			ps.setString(4, aProd.getStock());
			ps.setDouble(5, Double.valueOf(aProd.getPrice()));
			ps.setInt(6, aProd.getId());
			ps.setString(7, aProd.getCurrency());
			
			ps.execute();			
		
		}finally {
			closeConnection(connection);
			closeStatement(ps);
		}
	}

	private void closeStatement(PreparedStatement ps) throws SQLException{
		if(ps != null) {
			ps.close();
		}		
	}

	private void closeConnection(Connection connection) throws SQLException {
		if(connection != null) {
			connection.close();
		}		
	}
	
}
