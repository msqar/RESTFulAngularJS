var productApp = angular.module('productApp', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap', 'ngSanitize', 'angular-flash.service', 'angular-flash.flash-alert-directive']);

productApp.factory('productFactory', function($http, localStorageService) {
	var factory = {};
	var prodCurrencies = [
	                     	{
	                     		value: "USD",
	                     		label: "USD"
	                     	},{
	                     		value: "ARS",
	                     		label: "ARS"
	                     	},{
	                     		value: "GBP",
	                     		label: "GBP"
	                     	}];
	
	localStorageService.add('productCurrency', prodCurrencies);	
	
	factory.getAllProducts = function(callbackSuccess, callbackError) {
		$http({
			url: 'rest/message/getAllProducts',
			method: 'GET'
		})
		.success(callbackSuccess)
		.error(callbackError);
	}
	
	factory.addSimpleProduct = function(productBrand, productName, prodDescription, productStock, productPrice, productCurrency, callbackSuccess, callbackError) {
		
		if(productName !== '') {
			var postData = {
					prodName: productName,
					description: prodDescription,
					prodBrand: productBrand,
					stock: productStock,
					price: productPrice,
					currency: productCurrency
			};
			
			$http({
				url: 'rest/message/addNewProduct',
				method: 'POST',
				data: postData
			})
			.success(callbackSuccess)
			.error(callbackError);
		
		}else{
			alert("The product name can't be empty, please add a name");
		}
		
	}
	
	factory.removeProductById = function(prod_id, callbackSuccess, callbackError) {
		if(prod_id !== '') {
			$http({
				url: 'rest/message/removeProductById/' + prod_id,
				method: 'DELETE'
			})
			.success(callbackSuccess)
			.error(callbackError);
		}else {
			alert("There was an error while passing the ID. Please refresh the page and try again");
		}
	}
	
	factory.getProductById = function(prod_id, callbackData, callbackError) {		
		if(prod_id !== '') {
			$http({
				url: 'rest/message/getProductById/' + prod_id,
				method: 'GET'
			})
			.success(callbackData)				
			.error(callbackError);
		}else {
			alert("There was an error while passing the ID. Please refresh the page and try again");
		}		
	}
	
	factory.updateProductById = function(prodObj, callbackData, callbackError) {
		$http({
			url: 'rest/message/updateProductById',
			method: 'PUT',
			data: prodObj,
		})
		.success(callbackData)
		.error(callbackError);
	}
	
	return factory;
});