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

productApp.controller('ModalInstanceCtrl', function ($scope, $route, $modalInstance, productFactory, prodId, localStorageService) {	

  $scope.prodCurrencies = localStorageService.get('productCurrency');	
	
  // search product in the database
  productFactory.getProductById(prodId, function successCallback(data) {	  
	  $scope.modal_productBrand = data.prodBrand;
      $scope.modal_productName = data.prodName;
      $scope.modal_productDescription = data.description;
      $scope.modal_productPrice = data.price;
      $scope.modal_selectedCurrency = data.currency;
      if(data.stock === 'DISPONIBLE') {
    	  $scope.model_productStock = true;
      }
      
   }, function errorCallback(data, status) {
      alert("An error occurred retrieving product. Please refresh the page & try again.");
   });
  $scope.ok = function (modal_productBrand, modal_productName, modal_productDescription, modal_productPrice, modal_productStock, modal_productCurrency) {
	  var prodStock = '';
      if(model_productStock) {
    	  prodStock = 'DISPONIBLE';
      }else{
    	  prodStock = 'SIN STOCK';
      }      
      
      var productObject = {
			  id : prodId,
			  prodBrand : modal_productBrand,
			  prodName : modal_productName,
			  description : modal_productDescription,
			  price : modal_productPrice,
			  stock : prodStock,
			  currency : modal_productCurrency
	  }
      
      productFactory.updateProductById(productObject, function successCallback(data) {

    	  $modalInstance.dismiss('cancel');
    	  //re-render the whole page
    	  $route.reload();
      }, function errorCallback(data, status) {
    	  alert(data + ' Failed with error ' + status); 
      });    
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});