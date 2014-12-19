/* DOM manipulation for task tools  */

myApp.directive('taskFilter', [ '$location', function($location) {
	return function(scope, element, attr) {
		
		var showActiveTab = function(element)	{
			jQuery('.filter').removeClass('active');
			jQuery(element.currentTarget).addClass('active');
		}

		element.bind('click', showActiveTab);
	}
}]);