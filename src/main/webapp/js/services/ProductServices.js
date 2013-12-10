var productApp = angular.module('productApp', ['ngRoute', 'LocalStorageModule', 'angularSlideables', 'ui.bootstrap']);

productApp.factory('productFactory', function($http, localStorageService) {
	var factory = {};
		
	factory.init = function() {
		$http.get('rest/message/getAllProducts')
			.success(function(data) {
				localStorageService.add('productData', data);
			})
			.error(function(status) {
				localStorageService.add('productDataStatus', 'Error to retrieve data with Reason Code: ' + status);
		});
	}
	
	factory.init();
	
	factory.getAllProducts = function() {
		return localStorageService.get('productData');
	}
	
	factory.addSimpleProduct = function(productBrand, productName, prodDescription, productStock, productPrice) {
		
		if(productName !== '') {
			var postData = {
					prodName: productName,
					description: prodDescription,
					prodBrand: productBrand,
					stock: productStock,
					price: productPrice
			};
			
			$http({
				url: 'rest/message/addNewProduct',
				method: 'POST',
				data: postData
			}).success(function(data, status){
				return successMessage = data;
			});			
		}else{
			alert("The product name can't be empty, please add a name");
		}
		
	}
	
	factory.removeProductById = function(prod_id) {
		if(prod_id !== '') {
			$http({
				url: 'rest/message/removeProductById/' + prod_id,
				method: 'DELETE'
			}).success(function(data, status) {
				return successMessage = data;
			});
		}else {
			alert("There was an error while passing the ID. Please refresh the page and try again");
		}
	}
	
	factory.getProductById = function(prod_id) {
		if(prod_id !== '') {
			$http({
				url: 'rest/message/getProductById/' + prod_id,
				method: 'GET'
			}).success(function(data, status) {
				return;
			});
		}else {
			alert("There was an error while passing the ID. Please refresh the page and try again");
		}
	}
	
	return factory;
});