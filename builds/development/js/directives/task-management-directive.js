/* DOM manipulation for task tools  */

myApp.directive('taskTools', [ '$location', function($location) {
	return function(scope, element, attr) {
		
		var showSaveCancel = function()	{
			console.log(scope)
			element.addClass('show-icon');
			showSaveCancel()
		}

		element.bind('click', showSaveCancel);
	}
}]);