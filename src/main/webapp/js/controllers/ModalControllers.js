productApp.controller('ModalDemoCtrl', function ($scope, $modal) {

  $scope.open = function (id) {

    var modalInstance = $modal.open({
      templateUrl: 'partials/modal.htm',
      controller: 'ModalInstanceCtrl',
      resolve: {
    	  prodId : function () {
    		  return id;
    	  }
      }
    });
  };
});

productApp.controller('ModalInstanceCtrl', function ($scope, $route, $modalInstance, productFactory, prodId) {	

  // search product in the database
  productFactory.getProductById(prodId, function successCallback(data) {	  
	  $scope.model_productBrand = data.prodBrand;
      $scope.model_productName = data.prodName;
      $scope.model_productDescription = data.description;
      $scope.model_productPrice = data.price;
      if(data.stock === 'DISPONIBLE') {
    	  $scope.model_productStock = true;
      }
      
   }, function errorCallback(data, status) {
      alert("An error occurred retrieving product. Please refresh the page & try again.");
   });
  $scope.ok = function (model_productBrand, model_productName, model_productDescription, model_productPrice, model_productStock) {
	  var prodStock = '';
      if(model_productStock) {
    	  prodStock = 'DISPONIBLE';
      }else{
    	  prodStock = 'SIN STOCK';
      }      
      
      var productObject = {
			  id : prodId,
			  prodBrand : model_productBrand,
			  prodName : model_productName,
			  description : model_productDescription,
			  price : model_productPrice,
			  stock : prodStock
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