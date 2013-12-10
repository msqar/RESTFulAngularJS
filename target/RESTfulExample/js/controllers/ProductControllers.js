productApp.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			controller: 'prodCtrl',
			templateUrl: 'partials/productView.htm'
		})
		.otherwise({redirectTo: '/'});
});

productApp.controller('prodCtrl', function($scope, productFactory) {
	$scope.prodList = productFactory.getAllProducts();
	
	$scope.addNewProduct = function() {
		console.log("im here!");
		var productName = $scope.productName;
		var description = $scope.productDescription;
		console.log(productName + ' ' + description)
		
		if(productName !== '') {
			$scope.successMessage = productFactory.addSimpleProduct(productName, description);
			console.log($scope.successMessage);
		}else{
			alert('Product name can\'t be empty!');
		}
	}
});

