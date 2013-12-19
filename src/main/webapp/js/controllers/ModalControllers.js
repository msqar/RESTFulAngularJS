productApp.controller('ModalDemoCtrl', function ($scope, $modal) {

  $scope.open = function (id) {

    var modalInstance = $modal.open({
      templateUrl: 'modals/updateProductModal.htm',
      controller: 'ModalInstanceCtrl',
      resolve: {
    	  prodId : function () {
    		  return id;
    	  }
      }
    });
  };
});

productApp.controller('ModalInstanceCtrl', function ($scope, $route, $rootScope, $modalInstance, productFactory, prodId, localStorageService) {	

  $scope.prodCurrencies = localStorageService.get('productCurrency');	
	
  // search product in the database
  productFactory.getProductById(prodId, function successCallback(data) {	  
	  $scope.modal_productBrand = data.prodBrand;
      $scope.modal_productName = data.prodName;
      $scope.modal_productDescription = data.description;
      $scope.modal_productPrice = data.price;
      $scope.modal_selectedCurrency = data.currency;
      
      if(data.stock === 'DISPONIBLE') {
    	  $scope.modal_productStock = true;
      }
      
   }, function errorCallback(data, status) {
      alert("An error occurred retrieving product. Please refresh the page & try again.");
   });

  $scope.ok = function () {
	  
	 this.$watchCollection('[modal_productBrand, modal_productName, modal_productDescription, modal_productPrice, modal_productStock, modal_selectedCurrency]', 
			  function(newValues) {

		  var prodStock = '';
		  if(newValues[4]) {
			  prodStock = 'DISPONIBLE';
		  }else{
			  prodStock = 'SIN STOCK';
		  }      
		  
		  var productObject = {
				  id : prodId,
				  prodBrand : newValues[0],
				  prodName : newValues[1],
				  description : newValues[2],
				  price : newValues[3],
				  stock : prodStock,
				  currency : newValues[5]
		  }
		  
		  console.log(productObject)
		  
		  productFactory.updateProductById(productObject, function successCallback(data) {
			  
			  $modalInstance.dismiss('cancel');
			  
			  $rootScope.$broadcast('UPDATE_PRODUCT_RESPONSE_SUCCESS', data);
			  //re-render the whole page
//			  $route.reload();
		  }, function errorCallback(data, status) {
			  $rootScope.$broadcast('UPDATE_PRODUCT_RESPONSE_ERROR', data);
		  });    
		  
	  });  
	  
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});