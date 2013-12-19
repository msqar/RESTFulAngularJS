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

/**
 * This directive creates a timer
 * @author mmarzull
 */

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

productApp.directive('isNumber', function () {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs) {
			scope.$watch(attrs.ngModel, function(newValue,oldValue) {
				var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                	if(attrs.ngModel === 'productPrice') {
                		scope.productPrice = oldValue;
                	}else if(attrs.ngModel === 'modal_productPrice') {
                		if(oldValue === undefined) {
                			console.log(scope)
                			oldValue = 
                		}
                		scope.modal_productPrice = oldValue;
                	}
                }
            });
		}
	};
});
