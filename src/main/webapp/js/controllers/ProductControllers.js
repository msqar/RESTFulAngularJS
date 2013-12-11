productApp.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			controller: 'prodCtrl',
			templateUrl: 'partials/productView.htm'
		})
		.otherwise({redirectTo: '/'});
});

productApp.controller('prodCtrl', function($scope,  $modal, productFactory) {
	$scope.prodList = {};
		
	var callProds = function() {
		productFactory.getAllProducts(function successCallBack(data){
			$scope.prodList = data;
		}, function errorCallback(data, status) {
			$scope.errorAlert = true;
			$scope.alertErrorData = 'Problem when trying to retrieve products from DB';
		});
	}
	
	callProds();	
	
	for (var poss = 0; poss < $scope.prodList.length; poss++) {
		if($scope.prodList[poss].stock === 'SIN STOCK') {
			$scope.prodList[poss].stock_color = 'red';
		}else{
			$scope.prodList[poss].stock_color = 'green';
		}
	}
	
	$scope.addNewProduct = function() {
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
		
		if(productName !== '' || productBrand != '') {
			productFactory.addSimpleProduct(productBrand, productName, description, stock, price, function callbackSuccess(data) {
				// success
//				$scope.notification = "<div>JIJIJIJI</div>";
				$scope.notification = "<div class='notification' type='alert-success' message='this is a test'></div>";
//				$scope.alert.push({ type: "alert-success", msg: data.response});
				callProds();
			}, function errorCallback(data, status) {
				// error
			});
		}else{
			$scope.errorAlert = true;
			$scope.alertErrorData = 'Product name and brand can\'t be empty!';
		}
	}
	
	$scope.removeProduct = function(id) {
		productFactory.removeProductById(id, function callbackSuccess(data) {
//			$scope.successAlert = true;
//			$scope.alertSuccessData = data.response;
			callProds();
		}, function errorCallback(data, status) {
//			$scope.errorAlert = true;
//			$scope.alertErrorData = data.response + ' with status ' + status;
		});
	}
});

