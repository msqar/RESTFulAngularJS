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
} ]);


productApp.directive('notification', function($timeout) {
	return {
		restrict : 'C',
		replace : true,
		scope : {
			type: "=",
			message: "="
		},
		//template : '<alert class="alert alert-success alert-dismissable" type="type">message</alert>',
		template: '<div class="alert {{type}} alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>{{message}}</div>',
		link : function(scope, element, attrs) {
			console.log(attrs);
			$timeout(function() {
				element.hide();
			}, 3000);
		}
	}
});

