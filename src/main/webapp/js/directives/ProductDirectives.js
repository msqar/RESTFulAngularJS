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

productApp.directive('timer', function($interval) {
	return {
		restrict : 'E',
		scope : {
			interval : "=",
		},
		template : '<div>{{hour}} hours, {{minutes}} minutes and {{seconds}} seconds</div>',
		link : function(scope, element, attrs) {
			scope.seconds = 0;
			scope.minutes = 0;
			scope.hour = 0;
			$interval(function() {
				if (scope.seconds === 59) {
					scope.minutes++;
					scope.seconds = 0;
				}
				if (scope.minutes === 59) {
					scope.hour++;
					scope.minutes = 0;
					scope.seconds = 0;
				}
				scope.seconds++;
			}, attrs.interval);
		}
	}
});
