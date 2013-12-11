package com.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.model.ProductManager;
import com.pojo.Product;

@Path("/message")
public class MessageRestService {

	@GET
	@Path("/{param}")
	public Response printMessage(@PathParam("param") String msg) {

		String result = "Restful example : " + msg;

		return Response.status(200).entity(result).build();

	}
	
	@GET
	@Path("/getAllProducts")
	public Response getAllProducts() {
		List<Product> prodList = new ArrayList<Product>();
		
		ProductManager manager = new ProductManager();
		prodList = manager.getAllProducts();
		Gson gson = new Gson();
		String json = gson.toJson(prodList);
		
		
		return Response.status(200).entity(json).build();
	}
	
	@POST
	@Path("/addNewProduct")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addNewProduct(String jsonRequest) {
		
		Gson gson = new Gson();
		Product prod = gson.fromJson(jsonRequest, Product.class);
		
		ProductManager manager = new ProductManager();
		System.out.println("This is the product being added: " + prod.getProdName() + " : " + prod.getDescription());
		manager.addNewProduct(prod);
		String json = "{ \"response\" : \"Product has been successfully saved.\"}";
		
		return Response.status(200).entity(json).build();
	}
	
	@DELETE
	@Path("/removeProductById/{id}")
	public Response removeProductById(@PathParam("id") String id) {
		
		ProductManager manager = new ProductManager();
		System.out.println("The product with id: " + id + " will be removed from the list");
		manager.removeProdById(id);
		String json = "{ \"response\" : \"Product has been successfully removed.\"}";
		
		return Response.status(200).entity(json).build();
	}
	
	@GET
	@Path("/getProductById/{id}")
	public Response getProductById(@PathParam("id") String id) {
		Product aProduct = new Product();
		
		ProductManager manager = new ProductManager();
		System.out.println("The product with id: " + id + " will be gotten from the list");
		aProduct = manager.getProductById(id);
		Gson gson = new Gson();
		String json = gson.toJson(aProduct);
		
		
		return Response.status(200).entity(json).build();
	}
	
	@PUT
	@Path("/updateProductById")
	public Response updateProductById(String jsonProduct) {
		
		Gson gson = new Gson();
		Product aProd = gson.fromJson(jsonProduct, Product.class);
		ProductManager manager = new ProductManager();
		System.out.println("The product with id: " + aProd.getId() + " will be updated");
		manager.updateProductById(aProd);	
		
		String json = "{ \"response\" : \"Product has been successfully updated.\"}";
		return Response.status(200).entity(json).build();
	}

}