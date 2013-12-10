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
	
	for (var poss = 0; poss < $scope.prodList.length; poss++) {
		if($scope.prodList[poss].stock === 'SIN STOCK') {
			$scope.prodList[poss].stock_color = 'red';
		}else{
			$scope.prodList[poss].stock_color = 'green';
		}
	}
	
	console.log($scope.prodList);
	
	$scope.addNewProduct = function() {
		console.log("im here!");
		var productBrand = $scope.productBrand;
		var productName = $scope.productName;
		var description = $scope.productDescription;
		var stock = '';
		var price = $scope.productPrice + '.00';
		
		if($scope.productStock) {
			stock = 'DISPONIBLE';
		}else{
			stock = 'SIN STOCK';
		}
		
		console.log(productName + ' ' + description)
		
		if(productName !== '') {
			$scope.successMessage = productFactory.addSimpleProduct(productBrand, productName, description, stock, price);
			console.log($scope.successMessage);
		}else{
			alert('Product name can\'t be empty!');
		}
	}
});

