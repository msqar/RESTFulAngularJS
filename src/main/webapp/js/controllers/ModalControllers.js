productApp.controller('ModalDemoCtrl', function ($scope, $modal) {

  $scope.open = function (id) {
	console.log("estoy aca " + id)
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

productApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, localStorageService, productFactory, prodId) {	
  
  // search product in the database
  $scope.prod = productFactory.getProductById(prodId);
  console.log("sarasa")
  $scope.ok = function () {
	  console.log($scope.prodData);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});