productApp.directive('ngConfirmClick', [ function() {
	return {
		link : function(scope, element, attr) {
			var msg = attr.ngConfirmClick
					|| "Are you sure you want to delete this?";
			var clickAction = attr.confirmedClick;
			element.bind('click', function(event) {
				if (window.confirm(msg)) {
					scope.$eval(clickAction)
				}
			});
		}
	};
}]);


productApp.directive('zippy', function() {
	return {
		restrict: "E",
		transclude: true,
		replace: true,
		scope: { 
			name: "@"
		},
		template: "<div>{{name}}<div ng-transclude></div></div>",
		link: function(scope, element, attrs) {
			console.log(scope.name);
		}
	}
});

