productApp.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			controller: 'prodCtrl',
			templateUrl: 'partials/productView.htm'
		})
		.otherwise({redirectTo: '/'});
});

productApp.controller('prodCtrl', function($scope,  $modal, productFactory, $interval, flash, localStorageService) {
	$scope.prodList = {};
	$scope.alert = {};
	$scope.prodCurrencies = localStorageService.get('productCurrency');
		
	var callProds = function() {
		productFactory.getAllProducts(function successCallBack(data){
			$scope.prodList = data;
			
			for (var poss = 0; poss < $scope.prodList.length; poss++) {
				if($scope.prodList[poss].stock === 'SIN STOCK') {
					$scope.prodList[poss].stock_color = 'red';
				}else{
					$scope.prodList[poss].stock_color = 'green';
				}
			}
			
		}, function errorCallback(data, status) {
			$scope.errorAlert = true;
			$scope.alertErrorData = 'Problem when trying to retrieve products from DB';
		});
	}	
	
	callProds();
	
	$interval(function() {
		callProds();
	}, 5000);
	
	$scope.addNewProduct = function() {
		var productBrand = $scope.productBrand;
		var productName = $scope.productName;
		var description = $scope.productDescription;
		var stock = '';
		var price = $scope.productPrice + '.00';		
		var currency = $scope.selectedCurrency;

		if($scope.productStock) {
			stock = 'DISPONIBLE';
		}else{
			stock = 'SIN STOCK';
		}
		
		if(typeof (productName) !== 'undefined' || productName !== null || typeof (productBrand) !== 'undefined' || productBrand !== null) {
			productFactory.addSimpleProduct(productBrand, productName, description, stock, price, currency, function callbackSuccess(data) {
				$scope.alert = {
					heading: "Success!"
				}
				flash.success = data.response;
				callProds();
			}, function errorCallback(data, status) {
				$scope.alert = {
						heading: "Error!"
					}
				flash.error = data + ' with status ' + status;
			});
		}else{
			$scope.errorAlert = true;
			$scope.alertErrorData = 'Product name and brand can\'t be empty!';
		}
	}
	
	$scope.removeProduct = function(id) {
		productFactory.removeProductById(id, function callbackSuccess(data) {
			$scope.alert = {
					heading: "Success!"
				}
			flash.success = data.response;
			callProds();
		}, function errorCallback(data, status) {
			$scope.alert = {
					heading: "Error!"
				}
			flash.error = data + ' with status ' + status;
		});
	}
	
	this.$inject = ['flash'];
});

