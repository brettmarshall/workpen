/* DOM manipulation for task tools  */

myApp.directive('taskTools', [ '$location', function($location) {
	return function(scope, element, attr) {
		
		var showSaveCancel = function()	{
			console.log(scope)
		}

		element.bind('click', showSaveCancel);
	}
}]);