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

productApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, productFactory, prodId) {	

  // search product in the database
  productFactory.getProductById(prodId, function successCallback(data) {
      $scope.prod = data;
      
      $scope.model_productBrand = $scope.prod.prodBrand;
      $scope.model_productName = $scope.prod.prodName;
      $scope.model_productDescription = $scope.prod.description;
      $scope.model_productPrice = $scope.prod.price;
      if($scope.prod.stock === 'DISPONIBLE') {
    	  $scope.model_productStock = true;
      }
      
   }, function errorCallback(data, status) {
      alert("An error occurred retrieving product. Please refresh the page & try again.");
   });
  $scope.ok = function () {
	  // do something
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});