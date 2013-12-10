var productApp = angular.module('productApp', ['ngRoute', 'LocalStorageModule']);

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
	
	factory.addSimpleProduct = function(productName, prodDescription) {
		
		if(productName !== '') {
			var postData = {
					prodName: productName,
					description: prodDescription
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
	
	return factory;
});