productApp.controller('ModalDemoCtrl', function ($scope, $modal) {

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'partials/modal.htm',
      controller: 'ModalInstanceCtrl'
    });
  };
});

productApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
   alert($scope.text);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});